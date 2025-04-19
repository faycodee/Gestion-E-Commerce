<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Google\Client;
use Google\Service\Sheets;

class GoogleSheetsController extends Controller
{
    private $spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheets ID

    public function appendToSheet(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'tele' => 'required|string|max:20',
            'adresse' => 'required|string|max:255',
            'total' => 'required|numeric',
            'products' => 'required|array',
        ]);

        // Load Google Sheets API credentials from .env
        $googleCredentials = [
            "type" => env('GOOGLE_SHEETS_TYPE'),
            "project_id" => env('GOOGLE_SHEETS_PROJECT_ID'),
            "private_key_id" => env('GOOGLE_SHEETS_PRIVATE_KEY_ID'),
            "private_key" => env('GOOGLE_SHEETS_PRIVATE_KEY'),
            "client_email" => env('GOOGLE_SHEETS_CLIENT_EMAIL'),
            "client_id" => env('GOOGLE_SHEETS_CLIENT_ID'),
            "auth_uri" => env('GOOGLE_SHEETS_AUTH_URI'),
            "token_uri" => env('GOOGLE_SHEETS_TOKEN_URI'),
            "auth_provider_x509_cert_url" => env('GOOGLE_SHEETS_AUTH_PROVIDER_CERT_URL'),
            "client_x509_cert_url" => env('GOOGLE_SHEETS_CLIENT_CERT_URL'),
        ];

        // Authenticate with Google Sheets API
        $client = new Client();
        $client->setAuthConfig($googleCredentials); // Use the credentials from .env
        $client->addScope(Sheets::SPREADSHEETS);

        $service = new Sheets($client);

        // Prepare data to append
        $values = [
            [
                $validated['user_id'],
                $validated['name'],
                $validated['tele'],
                $validated['adresse'],
                $validated['total'],
                json_encode($validated['products']), // Convert products array to JSON
                now()->toDateTimeString(), // Timestamp
            ],
        ];

        $body = new Sheets\ValueRange([
            'values' => $values,
        ]);

        // Append data to the sheet
        $range = 'Sheet1!A:G'; // Adjust the range based on your sheet structure
        $params = ['valueInputOption' => 'RAW'];

        try {
            $service->spreadsheets_values->append($this->spreadsheetId, $range, $body, $params);
            return response()->json(['message' => 'Data appended to Google Sheets successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to append data to Google Sheets', 'details' => $e->getMessage()], 500);
        }
    }
}
