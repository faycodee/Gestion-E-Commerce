<?php

namespace App\Controllers;

use App\Models\Facture;

class FactureController
{
    public function createFacture(array $data)
    {
        // Logic to create a new invoice
        $facture = new Facture($data);
        $facture->save();
        return $facture;
    }

    public function updateFacture(int $id, array $data)
    {
        // Logic to update an existing invoice
        $facture = Facture::find($id);
        if ($facture) {
            $facture->update($data);
            return $facture;
        }
        return null;
    }

    public function deleteFacture(int $id)
    {
        // Logic to delete an invoice
        $facture = Facture::find($id);
        if ($facture) {
            $facture->delete();
            return true;
        }
        return false;
    }

    public function getFacture(int $id)
    {
        // Logic to retrieve an invoice
        return Facture::find($id);
    }
}