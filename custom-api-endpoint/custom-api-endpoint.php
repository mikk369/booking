<?php
/*
Plugin Name: Custom Api Endpoint
Version: 1.0
Author: Mike
*/

// Add CORS headers
function add_cors_headers() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
}
add_action('init', 'add_cors_headers');

add_action('rest_api_init', 'register_bookings_endpoint');

// registered endpoints 
function register_bookings_endpoint() {
     register_rest_route(
        'bookings/v1',
        '/bookings',
        array(
            'methods' => 'GET',
            'callback' => 'get_all_bookings',
            'permission_callback' => '__return_true' 
        )
    );

    register_rest_route(
        'bookings/v1',
        '/add-booking',
        array(
            'methods' => 'POST',
            'callback' => 'post_booking',
            'permission_callback' => '__return_true' 
        )
    );
}

// API endpoint callback functions 
function get_all_bookings() {
    global $wpdb;
    $table_name = 'bookings';
    $results = $wpdb->get_results("SELECT * FROM $table_name");
    return $results;
}

function post_booking($request) {
    global $wpdb;
    $table_name = 'bookings';

    $wpdb->insert(
        $table_name,
        array(
            'startdate' => $request['startdate'],
            'enddate' => $request['enddate'],
            'email' => $request['email'],
        )
    );
    return new WP_REST_Response( array('message' => 'Booking added successfully' ), 200 );
}
