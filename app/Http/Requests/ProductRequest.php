<?php

namespace App\Http\Requests;

use App\Models\Pet;
use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        switch ($this->method()) {
            case 'POST':
            {
                return [
                    'reference' => ['required', 'unique:products'],
                    'name' => ['required'],
                    'observations' => ['required'],
                    'price' => ['required', 'max:20'],
                    'tax' => ['required', 'max:2'],
                    'amount' => ['required', 'max:4'],
                    'file' => 'required|image|mimes:jpg|file|max:200',
                    'status' => [Rule::in(Product::availableValues())],
                ];
            }
            case 'PUT':
            {
                return [
                    'reference' => ['required', Rule::unique('products')->ignore($this->product)],
                    'name' => ['required'],
                    'observations' => ['required'],
                    'price' => ['required', 'max:20'],
                    'tax' => ['required', 'max:2'],
                    'amount' => ['required', 'max:4'],
                    'file' => 'nullable|image|mimes:jpg|file|max:200',
                    'status' => [Rule::in(Product::availableValues())],
                ];
            }
        }
    }
}
