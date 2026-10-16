<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Helpers\CommonHelper;
use App\Services\LanguageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ModulesApiController extends Controller
{
    protected $languageService;

    public function __construct(LanguageService $languageService)
    {
        $this->languageService = $languageService;
    }

    /**
     * Fetch list of active modules.
     */
    public function index()
    {
        $request = request();
        $modules = Module::withAllTranslations()->orderBy('row_order', 'ASC');
        if ($request->has('all')) {
            $modules = $modules->get();
        } else {
            $modules = $modules->where('status', 1)->get();
        }
        return CommonHelper::responseWithData($modules);
    }

    /**
     * Update module.
     */
    public function update(Request $request)
    {
        $defaultLanguage = $this->languageService->getDefaultLanguage();
        $isDefaultLang = $request->language_id == $defaultLanguage->id;

        $rules = [
            'id' => 'required|exists:modules,id',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'required|integer|in:0,1',
            'language_id' => 'required|exists:languages,id',
            'image' => 'nullable|mimes:svg|max:2048',
            'is_default' => 'sometimes|boolean'
        ];

        if ($isDefaultLang) {
            $rules['slug'] = 'sometimes|required|string';
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $module = Module::find($request->id);
        if (!$module) {
            return CommonHelper::responseError('module_not_found');
        }

        if ($request->status == 0) {
            $activeCount = Module::where('id', '!=', $module->id)->where('status', 1)->count();
            if ($activeCount === 0) {
                return CommonHelper::responseError('at_least_one_module_must_be_active');
            }
            if ($module->is_default) {
                return CommonHelper::responseError('default_module_must_be_active');
            }
        }

        if ($isDefaultLang && $request->has('is_default') && !$request->boolean('is_default') && $module->is_default) {
            return CommonHelper::responseError('at_least_one_module_must_be_default');
        }

        if ($isDefaultLang) {
            $module->name = $request->name;
            if ($request->has('slug')) {
                if ($request->filled('slug')) {
                    $module->slug = \Illuminate\Support\Str::slug($request->slug);
                } else {
                    $module->slug = \Illuminate\Support\Str::slug($request->name);
                }
            }
            $module->description = $request->description;
            $module->status = $request->status;

            if ($request->has('is_default') && $request->boolean('is_default')) {
                Module::where('id', '!=', $module->id)->where('is_default', 1)->update(['is_default' => 0]);
                $module->is_default = 1;

                // Default module always leads the list - bump every other module's row_order
                // down by one and place this one at the front.
                Module::where('id', '!=', $module->id)->increment('row_order');
                $module->row_order = 1;
            }

            if ($request->hasFile('image')) {
                // Delete old image
                if ($module->image) {
                    @Storage::disk('public')->delete($module->image);
                }
                $file = $request->file('image');
                $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('modules', $file, $fileName);
                $module->image = $image;
            }

            $module->save();
        }

        $module->saveTranslation($request->language_id, [
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return CommonHelper::responseSuccess('module_updated_successfully');
    }

    /**
     * Update modules row order.
     */
    public function updateModulesOrder(Request $request)
    {
        $modules = $request->all();
        foreach ($modules as $module) {
            Module::where('id', $module['id'])->update(['row_order' => $module['row_order']]);
        }
        return CommonHelper::responseSuccess('module_order_updated_successfully');
    }
}
