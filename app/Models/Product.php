<?php

namespace App\Models;
use App\Traits\HasTranslations;
use App\Traits\HasModuleContext;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Product extends Model
{

    use HasFactory, HasTranslations, HasModuleContext {
        HasTranslations::toArray as private translationsToArray;
    }
    protected $fillable = [
        'name',
        'category_id',
        'indicator',
        'manufacturer',
        'made_in',
        'require_prescription',
        'return_status',
        'cancelable_status',
        'till_status',
        'description',
        'image',
        'seller_id',
        'is_approved',
        'brand_id',
        'return_days',
        'tax_id',
        'fssai_lic_no',
        'barcode',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'schema_markup',
        'custom_field_values',
    ];

    protected $appends = ['image_url', 'translations', 'indicator', 'fssai_lic_no'];

    protected $hidden=['created_at','updated_at','deleted_at'];

    protected $casts = [
        'custom_field_values' => 'array',
    ];

    public function seller(){

        return $this->belongsTo(Seller::class,'seller_id','id');
    }

    public function tax(){
        return $this->belongsTo(Tax::class,'tax_id','id');
    }

    public function madeInCountry(){
        return $this->belongsTo(Country::class,'made_in','id');
    }

    public function category(){
        return $this->belongsTo(Category::class,'category_id','id');
    }

    public function variants(){

        return $this->hasMany(ProductVariant::class,'product_id','id');
    }

    public function images(){

        return $this->hasMany(ProductImages::class,'product_id','id')
            ->where('product_variant_id',0);
    }

    public function brand(){
        return $this->belongsTo(Brand::class,'brand_id','id');
    }

    /**
     * indicator/fssai_lic_no were dropped as columns in version_4_0_1 - they now live in
     * custom_field_values under the module=product CustomField matching their name (seeded in
     * that same migration, scoped per module_id: "Product Type" only exists for
     * Grocery/Ecommerce, mirroring the old Pharmacy-forced-0 behaviour by simply having no field
     * to write to). These accessors/mutators keep every existing $product->indicator /
     * $product->fssai_lic_no read AND write call site working unchanged.
     */
    public static function resolveCustomFieldId(string $name, $moduleId = null)
    {
        $moduleId = $moduleId ?? static::getCurrentModuleId();

        // Called from the indicator/fssai_lic_no accessors, which run on every Product
        // serialization - un-cached, a list of N products re-queries this N times per field.
        // Static cache to avoid redundant lookups in the same request.
        static $cache = [];
        $cacheKey = $name . ':' . $moduleId;
        if (!array_key_exists($cacheKey, $cache)) {
            $cache[$cacheKey] = \App\Models\CustomField::withoutGlobalScope('module')
                ->where('module', 'product')
                ->where('module_id', $moduleId)
                ->where('name', $name)
                ->value('id');
        }

        return $cache[$cacheKey];
    }

    public function getIndicatorAttribute()
    {
        $fieldId = static::resolveCustomFieldId('Product Type', $this->module_id);
        $values = $this->custom_field_values ?? [];
        $label = $fieldId ? ($values[$fieldId] ?? null) : null;

        if ($label === 'Veg') {
            return 1;
        }
        if ($label === 'Non-veg') {
            return 2;
        }

        return 0;
    }

    public function setIndicatorAttribute($value)
    {
        $fieldId = static::resolveCustomFieldId('Product Type', $this->module_id ?: static::getCurrentModuleId());
        if (!$fieldId) {
            return;
        }

        $values = $this->custom_field_values ?? [];
        $label = ((int) $value === 1) ? 'Veg' : (((int) $value === 2) ? 'Non-veg' : null);

        if ($label) {
            $values[$fieldId] = $label;
        } else {
            unset($values[$fieldId]);
        }

        $this->attributes['custom_field_values'] = json_encode($values);
    }

    public function getFssaiLicNoAttribute()
    {
        $fieldId = static::resolveCustomFieldId('FSSAI Lic. No.', $this->module_id);
        $values = $this->custom_field_values ?? [];

        return $fieldId ? ($values[$fieldId] ?? '') : '';
    }

    public function setFssaiLicNoAttribute($value)
    {
        $fieldId = static::resolveCustomFieldId('FSSAI Lic. No.', $this->module_id ?: static::getCurrentModuleId());
        if (!$fieldId) {
            return;
        }

        $values = $this->custom_field_values ?? [];

        if ($value !== null && $value !== '') {
            $values[$fieldId] = $value;
        } else {
            unset($values[$fieldId]);
        }

        $this->attributes['custom_field_values'] = json_encode($values);
    }

    /**
     * indicator/fssai_lic_no are $appends-ed attributes, so they'd otherwise show up in every
     * product API response for every module - even a module (like Food Delivery, module_id 4)
     * that has no matching "Product Type"/"FSSAI Lic. No." CustomField row at all. Strip each key
     * entirely when its backing field doesn't exist for this product's module, instead of always
     * returning a meaningless 0/"" placeholder.
     */
    public function toArray()
    {
        $array = $this->translationsToArray();

        if (array_key_exists('indicator', $array) && !static::resolveCustomFieldId('Product Type', $this->module_id)) {
            unset($array['indicator']);
        }

        if (array_key_exists('fssai_lic_no', $array) && !static::resolveCustomFieldId('FSSAI Lic. No.', $this->module_id)) {
            unset($array['fssai_lic_no']);
        }

        return $array;
    }

    public function getImageUrlAttribute(){

        // Falls back to the first gallery image when the product has no primary image set
        // (e.g. only images were added via the gallery) - mirrors the admin product list's
        // own CASE WHEN ... product_images fallback so customer listings don't show blank.
        $image = $this->image;
        if (!$image) {
            // No product_variant_id filter here on purpose: many products only ever get
            // variant-level images (e.g. one per size/colour) and never a product-level
            // gallery image, so restricting to product_variant_id=0 missed those entirely.
            $image = DB::table('product_images')
                ->where('product_id', $this->id)
                ->orderBy('id')
                ->value('image');
        }

        return $image ? asset('storage/'.$image) : '';
    }
    public function ratings()
    {
        return $this->hasMany(ProductRating::class, 'product_id');
    }
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'product_tag');
    }

    public function addonGroups()
    {
        return $this->belongsToMany(AddonGroup::class, 'product_addon_groups');
    }

    // Multi-language support
    protected $translatable = [
        'name',
        'tags',
        'manufacturer',
        'description',
        'meta_title',
        'meta_keywords',
        'schema_markup',
        'meta_description',
    ];

    protected $translationModel = 'ProductTranslation';
    protected $translationForeignKey = 'product_id';
}
