<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\SocialMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SocialMediaApiController extends Controller
{
    public function index(){
        $socialMedia = SocialMedia::orderBy('id','DESC')->get()->makeHidden(['image_url', 'image']);
        return CommonHelper::responseWithData($socialMedia);
    }

    public function save(Request $request){

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'image' => 'required|image|mimes:jpeg,jpg,png,gif,webp,svg|max:2048',
            'link' => 'required'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $socialMedia = new SocialMedia();
        $socialMedia->name = $request->name;
        $socialMedia->link = $request->link;

        $file = $request->file('image');
        $fileName = time() . '_' . rand(1111, 9999) . '.' . $file->getClientOriginalExtension();
        $socialMedia->image = Storage::disk('public')->putFileAs('social_media', $file, $fileName);

        $socialMedia->save();
        return CommonHelper::responseSuccess(__('social_media_saved_successfully'));
    }

    public function update(Request $request){

        if (isset($request->id)) {
            $socialMedia = SocialMedia::find($request->id);
            if (!$socialMedia) {
                return CommonHelper::responseError(__('social_media_record_not_found'));
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'image' => 'nullable|image|mimes:jpeg,jpg,png,gif,webp,svg|max:2048',
                'link' => 'required'
            ]);

            if ($validator->fails()) {
                return CommonHelper::responseError($validator->errors()->first());
            }

            $socialMedia->name = $request->name;
            $socialMedia->link = $request->link;

            if ($request->hasFile('image')) {
                if ($socialMedia->image) {
                    Storage::disk('public')->delete($socialMedia->image);
                }
                $file = $request->file('image');
                $fileName = time() . '_' . rand(1111, 9999) . '.' . $file->getClientOriginalExtension();
                $socialMedia->image = Storage::disk('public')->putFileAs('social_media', $file, $fileName);
            }

            $socialMedia->save();

            return CommonHelper::responseSuccess(__('social_media_updated_successfully'));
        }

        return CommonHelper::responseError("ID is required for updating Social Media!");
    }

    public function delete(Request $request){
        if(isset($request->id)){
            $socialMedia = SocialMedia::find($request->id);
            if($socialMedia){
                if ($socialMedia->image) {
                    Storage::disk('public')->delete($socialMedia->image);
                }
                $socialMedia->delete();
                return CommonHelper::responseSuccess(__('social_media_deleted_successfully'));
            }else{
                return CommonHelper::responseSuccess("Social Media Already Deleted!");
            }
        }
    }
}
