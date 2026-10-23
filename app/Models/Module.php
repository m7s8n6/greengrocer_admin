<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasTranslations;

    protected $table = 'modules';

    protected $fillable = ['name', 'image', 'description', 'status', 'row_order', 'slug', 'is_default'];

    protected $translatable = ['name', 'description'];

    protected $translationModel = 'ModuleTranslation';

    protected $appends = ['image_url', 'translations'];

    public function getImageUrlAttribute(){
        if($this->image){
            return asset('storage/' . $this->image);
        }
        // Every module needs an icon somewhere (header switcher, module list, mobile app).
        // Built-in modules (1 grocery, 2 pharmacy, 3 ecommerce, 4 food delivery) ship their own
        // default icon; anything else falls back to a shared generic icon instead of an empty
        // string that each consumer would otherwise have to guess a replacement for.
        $perModule = 'images/icons/module_default_' . $this->id . '.svg';
        if ($this->id && file_exists(public_path($perModule))) {
            return asset($perModule);
        }
        return asset('images/icons/module_default.svg');
    }
}
