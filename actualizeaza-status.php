<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $index = intval($_POST["index"]);
    $newStatus = intval($_POST["status"]);

    $file = "orders.txt";
    $lines = file($file, FILE_IGNORE_NEW_LINES);

    if (isset($lines[$index])) {
        $order = json_decode($lines[$index], true);
        $order["status"] = $newStatus;
        $lines[$index] = json_encode($order);
        file_put_contents($file, implode("\n", $lines));
        echo "success";
    } else {
        echo "invalid_index";
    }
} else {
    echo "invalid_request";
}
?>
