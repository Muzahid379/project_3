<?php
require_once 'condb.php';
$v = $_REQUEST["v"];
$v = explode("↱",$v);


$card_no=str_replace(' ', '',$v[2]);
$exp_month = (int)substr($v[3], 0,2);
$exp_year = (int)substr($v[3], -2);
$cvc = $v[4];
$price =(int)(100 * (float)$v[5]);

$sk = 'sk_test_51KjU6qDkJIRZYM9l6CijVHcU4w9a6c1ZI9LEYgQ58XLaBxolO3gnJQMJzhFHNNAqgmNjI8UaLjz5tkekdmeeRuMI00XaSibZap';
require_once '../stripe-php/init.php';
$stripe = new \Stripe\StripeClient($sk);
\Stripe\Stripe::setApiKey($sk);

try {
 $token=$stripe->tokens->create([
 'card' => [
   'number' => $card_no,
   'exp_month' => $exp_month,
   'exp_year' => $exp_year,
   'cvc' => $cvc,
   ],
 ]);
} catch (\Stripe\Error\Card $e) {
 echo $e;
} catch (Stripe_Error $e){
 echo $e;
}

$token=$stripe->tokens->create([
'card' => [
  'number' => $card_no,
  'exp_month' => $exp_month,
  'exp_year' => $exp_year,
  'cvc' => $cvc,
  ],
]);


$charge = \Stripe\Charge::create(array(
  "amount" => $price,
  "currency" => "usd",
  "description" => "paid reserve",
  "source" => $token,
));

$ci = $token['card']->id;

$q = "INSERT INTO `orders`(`cust_id`, `order`, `card_id`) VALUES ('$v[0]','$v[1]','$ci')";
Connect();
SetData($q);
KillCon();

echo true;

 ?>
