<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


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


}
