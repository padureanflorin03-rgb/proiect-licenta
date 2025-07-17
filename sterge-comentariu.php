<?php
$file = "forum.txt";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST["id"];
    $username = $_POST["username"];
    $mode = $_POST["mode"]; // question sau answer
    $answerIndex = isset($_POST["answerIndex"]) ? intval($_POST["answerIndex"]) : null;

    $lines = file_exists($file) ? file($file, FILE_IGNORE_NEW_LINES) : [];
    $updated = [];

    foreach ($lines as $line) {
        $entry = json_decode($line, true);

        if ($mode === "question" && $entry["id"] === $id && $entry["user"] === $username) {
            continue; // stergem intrebare
        }

        if ($mode === "answer" && $entry["id"] === $id && isset($entry["answers"][$answerIndex])) {
            if ($entry["answers"][$answerIndex]["user"] === $username) {
                array_splice($entry["answers"], $answerIndex, 1);
            }
        }

        $updated[] = json_encode($entry);
    }

    file_put_contents($file, implode("\n", $updated));
    echo "success";
}
?>
