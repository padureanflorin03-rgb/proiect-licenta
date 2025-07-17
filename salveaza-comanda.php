<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $fullname = $_POST["fullname"];
    $address = $_POST["address"];
    $phone = $_POST["phone"];
    $postalcode = $_POST["postalcode"];
    $email = $_POST["email"];
    $payment = $_POST["payment"];
    $cart = $_POST["cart"];
    $date = date("Y-m-d H:i:s");
    $total = 0;
    $cartItems = json_decode($cart, true);
    $productsList = [];

    foreach ($cartItems as $item) {
        $total += $item["price"] * $item["quantity"];
        $productsList[] = $item["name"] . " x" . $item["quantity"];
    }
    $products = implode(" | ", $productsList);
	
    // Structura pentru salvare JSON (pentru backup)
    $orderData = [
        "username" => $username,
        "fullname" => $fullname,
        "address" => $address,
        "phone" => $phone,
        "postalcode" => $postalcode,
        "email" => $email,
        "payment" => $payment,
        "cart" => $cartItems,
        "total" => $total,
        "status" => 0,
        "date" => $date
    ];

    //  Salvare in orders.txt 
    file_put_contents("orders.txt", json_encode($orderData) . "\n", FILE_APPEND);

//  Salvare in comenzi.csv (pentru Excel)
$csvFile = "comenzi.csv";

// se pregatesc produsele intr-un format compact
$produseText = "";
foreach ($cartItems as $item) {
    $produseText .= $item["name"] . " x" . $item["quantity"] . " = " . number_format($item["price"] * $item["quantity"], 2) . " $ | ";
}
$produseText = rtrim($produseText, " | ");

$header = [
    "Data", "Username", "Nume", "Email", "Telefon", "Adresă", "Cod Poștal", "Plată", "Produse", "Total", "Status"
];

$line = [
    $orderData["date"],
    $orderData["username"],
    $orderData["fullname"],
    $orderData["email"],
    $orderData["phone"],
    $orderData["address"],
    $orderData["postalcode"],
    $orderData["payment"],
    $produseText,
    number_format($orderData["total"], 2),
    $orderData["status"]
];

// Scriere in format UTF-8 cu BOM
$writeHeader = !file_exists($csvFile) || filesize($csvFile) === 0;
$f = fopen($csvFile, "a");

if ($writeHeader) {
    fwrite($f, "\xEF\xBB\xBF"); // UTF-8 BOM
    fputcsv($f, $header, ";");  // delimitator ; pentru Excel
}

fputcsv($f, $line, ";");
fclose($f);



    echo "success";
} else {
    echo "error";
}

//  Actualizare stoc
$stoc = json_decode(file_get_contents("stoc.json"), true);

foreach ($orderData["cart"] as $produs) {
    $id = $produs["id"];
    $cantitate = $produs["quantity"];

    if (isset($stoc[$id])) {
        $stoc[$id] -= $cantitate;
        if ($stoc[$id] < 0) {
            $stoc[$id] = 0;
        }
    }
}
file_put_contents("stoc.json", json_encode($stoc, JSON_PRETTY_PRINT));
?>
