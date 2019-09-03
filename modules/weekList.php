<?php
header('Content-Type: text/html; charset=utf-8');
include 'connect.php';
// Время работы
// $time = "10:00-17:00";
// Выходные
$free = array(
    "Суббота",
    "Воскресенье"
);

$weeks = array(
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
);

$weeks = array_map(function ($day) use ($free) {
    $length = mb_strlen($day, 'UTF-8');
    $void = str_repeat('&nbsp;', (20 - $length));
    return  in_array($day, $free)
        ? $day . $void
        : $day . $void;
}, $weeks);

$week = date('N');

?>

<select>
    <?php foreach (range(1, 7) as $day) { ?>
        <?php $selected = ($day == $week ? ' selected' : ''); ?>
        <option value="<?= $day ?>" <?= $selected ?>><?= $weeks[--$day] ?></option>
    <?php } ?>
</select>