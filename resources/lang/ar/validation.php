<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'يجب قبول :attribute.',
    'accepted_if' => 'يجب قبول :attribute عندما تكون قيمة :other هي :value.',
    'active_url' => ':attribute ليس رابطاً صحيحاً.',
    'after' => 'يجب أن يكون :attribute تاريخاً بعد :date.',
    'after_or_equal' => 'يجب أن يكون :attribute تاريخاً بعد أو يساوي :date.',
    'alpha' => 'يجب أن يحتوي :attribute على أحرف فقط.',
    'alpha_dash' => 'يجب أن يحتوي :attribute على أحرف وأرقام وشرطات وشرطات سفلية فقط.',
    'alpha_num' => 'يجب أن يحتوي :attribute على أحرف وأرقام فقط.',
    'array' => 'يجب أن يكون :attribute مصفوفة (array).',
    'before' => 'يجب أن يكون :attribute تاريخاً قبل :date.',
    'before_or_equal' => 'يجب أن يكون :attribute تاريخاً قبل أو يساوي :date.',
    'between' => [
        'numeric' => 'يجب أن تكون قيمة :attribute بين :min و :max.',
        'file' => 'يجب أن يكون حجم :attribute بين :min و :max كيلوبايت.',
        'string' => 'يجب أن يتكون :attribute من :min إلى :max حرفاً.',
        'array' => 'يجب أن يحتوي :attribute على :min إلى :max عنصراً.',
    ],
    'boolean' => 'يجب أن تكون قيمة حقل :attribute صحيحة أو خاطئة.',
    'confirmed' => 'تأكيد :attribute غير متطابق.',
    'current_password' => 'كلمة المرور غير صحيحة.',
    'date' => ':attribute ليس تاريخاً صحيحاً.',
    'date_equals' => 'يجب أن يكون :attribute تاريخاً مساوياً لـ :date.',
    'date_format' => ':attribute لا يطابق الصيغة :format.',
    'declined' => 'يجب رفض :attribute.',
    'declined_if' => 'يجب رفض :attribute عندما تكون قيمة :other هي :value.',
    'different' => 'قيمتا :attribute و :other مختلفتان.',
    'digits' => 'يجب أن يتكون :attribute من :digits أرقام.',
    'digits_between' => 'يجب أن يتكون :attribute من :min إلى :max أرقام.',
    'dimensions' => 'أبعاد الصورة في :attribute غير صحيحة.',
    'distinct' => 'يحتوي حقل :attribute على قيمة مكررة.',
    'email' => 'يجب أن يكون :attribute بريداً إلكترونياً صحيحاً.',
    'ends_with' => 'يجب أن ينتهي :attribute بواحدة من القيم التالية: :values.',
    'enum' => ':attribute المحدد غير صحيح.',
    'exists' => ':attribute المحدد غير موجود.',
    'file' => 'يجب أن يكون :attribute ملفاً.',
    'filled' => 'يجب ملء حقل :attribute.',
    'gt' => [
        'numeric' => 'يجب أن يكون :attribute أكبر من :value.',
        'file' => 'يجب أن يكون حجم :attribute أكبر من :value كيلوبايت.',
        'string' => 'يجب أن يكون طول :attribute أكبر من :value حرفاً.',
        'array' => 'يجب أن يحتوي :attribute على أكثر من :value عنصراً.',
    ],
    'gte' => [
        'numeric' => 'يجب أن يكون :attribute أكبر من أو يساوي :value.',
        'file' => 'يجب أن يكون حجم :attribute أكبر من أو يساوي :value كيلوبايت.',
        'string' => 'يجب أن يكون طول :attribute أكبر من أو يساوي :value حرفاً.',
        'array' => 'يجب أن يحتوي :attribute على :value عنصراً أو أكثر.',
    ],
    'image' => 'يجب أن يكون :attribute صورة.',
    'in' => ':attribute المحدد غير صحيح.',
    'in_array' => 'حقل :attribute غير موجود في :other.',
    'integer' => 'يجب أن يكون :attribute عدداً صحيحاً.',
    'ip' => 'يجب أن يكون :attribute عنوان IP صحيحاً.',
    'ipv4' => 'يجب أن يكون :attribute عنوان IPv4 صحيحاً.',
    'ipv6' => 'يجب أن يكون :attribute عنوان IPv6 صحيحاً.',
    'json' => 'يجب أن يكون :attribute نص JSON صحيحاً.',
    'lt' => [
        'numeric' => 'يجب أن يكون :attribute أقل من :value.',
        'file' => 'يجب أن يكون حجم :attribute أقل من :value كيلوبايت.',
        'string' => 'يجب أن يكون طول :attribute أقل من :value حرفاً.',
        'array' => 'يجب أن يحتوي :attribute على أقل من :value عنصراً.',
    ],
    'lte' => [
        'numeric' => 'يجب أن يكون :attribute أقل من أو يساوي :value.',
        'file' => 'يجب أن يكون حجم :attribute أقل من أو يساوي :value كيلوبايت.',
        'string' => 'يجب أن يكون طول :attribute أقل من أو يساوي :value حرفاً.',
        'array' => 'يجب ألا يحتوي :attribute على أكثر من :value عنصراً.',
    ],
    'mac_address' => 'يجب أن يكون :attribute عنوان MAC صحيحاً.',
    'max' => [
        'numeric' => 'يجب ألا تكون قيمة :attribute أكبر من :max.',
        'file' => 'يجب ألا يكون حجم :attribute أكبر من :max كيلوبايت.',
        'string' => 'يجب ألا يكون طول :attribute أكبر من :max حرفاً.',
        'array' => 'يجب ألا يحتوي :attribute على أكثر من :max عنصراً.',
    ],
    'mimes' => 'يجب أن يكون :attribute ملفاً من النوع: :values.',
    'mimetypes' => 'يجب أن يكون :attribute ملفاً من النوع: :values.',
    'min' => [
        'numeric' => 'يجب ألا تقل قيمة :attribute عن :min.',
        'file' => 'يجب ألا يقل حجم :attribute عن :min كيلوبايت.',
        'string' => 'يجب ألا يقل طول :attribute عن :min حرفاً.',
        'array' => 'يجب أن يحتوي :attribute على :min عنصراً على الأقل.',
    ],
    'multiple_of' => 'يجب أن يكون :attribute من مضاعفات :value.',
    'not_in' => ':attribute المحدد غير صحيح.',
    'not_regex' => 'صيغة :attribute غير صحيحة.',
    'numeric' => 'يجب أن يكون :attribute رقماً.',
    'password' => 'كلمة المرور غير صحيحة.',
    'present' => 'يجب أن يكون حقل :attribute موجوداً.',
    'prohibited' => 'حقل :attribute ممنوع.',
    'prohibited_if' => 'حقل :attribute ممنوع عندما تكون قيمة :other هي :value.',
    'prohibited_unless' => 'حقل :attribute ممنوع إلا إذا كانت قيمة :other ضمن :values.',
    'prohibits' => 'حقل :attribute يمنع وجود :other.',
    'regex' => 'صيغة :attribute غير صحيحة.',
    'required' => 'حقل :attribute مطلوب.',
    'required_array_keys' => 'يجب أن يحتوي حقل :attribute على قيم لـ: :values.',
    'required_if' => 'حقل :attribute مطلوب عندما تكون قيمة :other هي :value.',
    'required_unless' => 'حقل :attribute مطلوب إلا إذا كانت قيمة :other ضمن :values.',
    'required_with' => 'حقل :attribute مطلوب عند وجود :values.',
    'required_with_all' => 'حقل :attribute مطلوب عند وجود :values.',
    'required_without' => 'حقل :attribute مطلوب عند عدم وجود :values.',
    'required_without_all' => 'حقل :attribute مطلوب عند عدم وجود أي من :values.',
    'same' => 'يجب أن تتطابق قيمتا :attribute و :other.',
    'size' => [
        'numeric' => 'يجب أن تكون قيمة :attribute مساوية لـ :size.',
        'file' => 'يجب أن يكون حجم :attribute مساوياً لـ :size كيلوبايت.',
        'string' => 'يجب أن يكون طول :attribute مساوياً لـ :size حرفاً.',
        'array' => 'يجب أن يحتوي :attribute على :size عنصراً.',
    ],
    'starts_with' => 'يجب أن يبدأ :attribute بواحدة من القيم التالية: :values.',
    'string' => 'يجب أن يكون :attribute نصاً.',
    'timezone' => 'يجب أن يكون :attribute منطقة زمنية صحيحة.',
    'unique' => ':attribute مُستخدم من قبل.',
    'uploaded' => 'فشل رفع :attribute.',
    'url' => 'يجب أن يكون :attribute رابطاً صحيحاً.',
    'uuid' => 'يجب أن يكون :attribute معرف UUID صحيحاً.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
