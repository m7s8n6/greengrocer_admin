<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasModuleContext
{
    /**
     * Boot the trait to automatically register creating hooks and global scopes.
     */
    public static function bootHasModuleContext()
    {
        static::creating(function ($model) {
            $table = $model->getTable();
            if (\Illuminate\Support\Facades\Schema::hasColumn($table, 'module_id') && empty($model->module_id)) {
                $model->module_id = static::getCurrentModuleId();
            }
        });

        static::addGlobalScope('module', function (Builder $builder) {
            $moduleId = static::getCurrentModuleId();
            if ($moduleId) {
                $table = $builder->getModel()->getTable();
                
                // Static cache to avoid redundant schema calls in the same request
                static $hasModuleId = [];
                if (!isset($hasModuleId[$table])) {
                    $hasModuleId[$table] = \Illuminate\Support\Facades\Schema::hasColumn($table, 'module_id');
                }

                if ($hasModuleId[$table]) {
                    $from = $builder->getQuery()->from;
                    if (is_string($from)) {
                        $parts = preg_split('/\s+as\s+/i', $from);
                        if (count($parts) > 1) {
                            $table = trim($parts[1]);
                        } else {
                            $parts = preg_split('/\s+/', $from);
                            if (count($parts) > 1) {
                                $table = trim($parts[1]);
                            }
                        }
                    }
                    if ($table === 'custom_fields') {
                        $builder->where(function ($q) use ($table, $moduleId) {
                            $q->where($table . '.module_id', $moduleId)
                              ->orWhereIn($table . '.module', ['customer', 'delivery_boy']);
                        });
                    } else {
                        $builder->where($table . '.module_id', $moduleId);
                    }
                }
            }
        });
    }

    /**
     * Retrieve the current module ID from the request context.
     * Defaults to 1 (Grocery module).
     */
    public static function getCurrentModuleId()
    {
        // Delivery Boy (role_id = 4) is system/city-wide and not constrained by a single module
        if (auth()->check() && auth()->user()->role_id == 4) {
            return null;
        }

        // 1. Check for a request header first (best for SPA admin panel requests)
        if (request()->hasHeader('X-Module-Id')) {
            return (int) request()->header('X-Module-Id');
        }

        // 2. Check for query parameter/request input
        if (request()->has('module_id')) {
            return (int) request()->input('module_id');
        }

        // 3. Fallback to default (Grocery module = 1)
        return 1;
    }
}
