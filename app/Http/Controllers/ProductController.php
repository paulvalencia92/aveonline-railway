<?php

namespace App\Http\Controllers;

use App\Helpers\Uploader;
use App\Http\Requests\PetRequest;
use App\Http\Requests\ProductRequest;
use App\Models\Pet;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{

    public function index()
    {
        $data = Product::all();
        return response()->json($data, 200);
    }


    public function store(ProductRequest $request)
    {

        $file = "";

        if ($request->hasFile('file')) {
            $file = Uploader::uploadFile('file', 'products');
        }

        $data = Product::create([
            'reference' => $request->reference,
            'name' => $request->name,
            'observations' => $request->observations,
            'price' => $request->price,
            'tax' => $request->tax,
            'amount' => $request->amount,
            'status' => $request->status,
            'file' => $file,
        ]);


        return response()->json($data, 201);
    }


    public function findByStatus(Request $request)
    {
        $data = Product::query()
            ->where('status', $request->status)
            ->get();
        return response()->json($data, 200);
    }


    public function update(ProductRequest $request, Product $product)
    {

        $file = $product->file;

        if ($request->hasFile('file')) {
            if ($product->file) {
                Uploader::removeFile("products", $product->file);
            }
            $file = Uploader::uploadFile('file', 'products');
        }

        $product->reference = $request->reference;
        $product->name = $request->name;
        $product->observations = $request->observations;
        $product->price = $request->price;
        $product->tax = $request->tax;
        $product->amount = $request->amount;
        $product->status = $request->status;
        $product->file = $file;

        $product->save();


        return response()->json($product, 201);
    }


    public function destroy(Product $product)
    {
        if ($product->file) {
            if ($product->file != "product_default.jpg") {
                Uploader::removeFile("products", $product->file);
            }
        }
        $product->delete();
        return response()->json("delete success", 201);
    }

}
