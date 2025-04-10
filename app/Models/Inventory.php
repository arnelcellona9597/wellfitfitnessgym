<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon; 

class Inventory extends Model
{
    use HasFactory;

    protected $table = 'inventory';
    
    protected $fillable = [
        'id', 
        'inventory_name', 
        'inventory_image', 
        'inventory_description', 
        'inventory_quantity'
    ];  

 
    public static function getAllInventoryItems()
    {
        return self::all();
    }

    public static function getInventoryItemByID($id)
    {
        return self::find($id);
    }    


    public static function getTotalItems($startDate = null, $endDate = null)
    {
        return self::when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                $query->whereBetween('created_at', [
                    \Carbon\Carbon::parse($startDate)->startOfDay(),
                    \Carbon\Carbon::parse($endDate)->endOfDay()
                ]);
            })
            ->sum('inventory_quantity');
    }

    public static function getTotalInventoryData($startDate = null, $endDate = null)
    {
        return self::when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
            $query->whereBetween('created_at', [
                \Carbon\Carbon::parse($startDate)->startOfDay(),
                \Carbon\Carbon::parse($endDate)->endOfDay()
            ]);
        })->get();
    }

    
}
