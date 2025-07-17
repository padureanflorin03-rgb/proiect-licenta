<?php
$file = "forum.txt";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $type = $_POST["type"];
    $user = $_POST["user"];
    $date = date("Y-m-d H:i");

    $lines = file_exists($file) ? file($file, FILE_IGNORE_NEW_LINES) : [];

    if ($type === "question") {
        $question = $_POST["question"];
        $id = uniqid("q_");

        $entry = [
            "id" => $id,
            "user" => $user,
            "question" => $question,
            "date" => $date,
            "answers" => []
        ];

        $lines[] = json_encode($entry);
        file_put_contents($file, implode("\n", $lines));
        echo "success";
    }

    if ($type === "answer") {
        $questionId = $_POST["questionId"];
        $text = $_POST["text"];

        $updatedLines = [];
        foreach ($lines as $line) {
            $entry = json_decode($line, true);
            if ($entry["id"] === $questionId) {
                $entry["answers"][] = [
                    "user" => $user,
                    "text" => $text,
                    "date" => $date
                ];
            }
            $updatedLines[] = json_encode($entry);
        }
        file_put_contents($file, implode("\n", $updatedLines));
        echo "success";
    }
}
?>
