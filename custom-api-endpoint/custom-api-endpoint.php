<?php
/*
Plugin Name: Custom Api Endpoint
Version: 1.0
Author: Mike
*/

add_action('rest_api_init', 'register_bookings_endpoint');

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

function get_all_bookings() {
    global $wpdb;
    $table_name = 'bookings';
    $results = $wpdb->get_results("SELECT * FROM $table_name");
    return $results;
}

function post_booking($request) {
    global $wpdb;
    $table_name = 'bookings';

    $rows = $wpdb->insert(
        $table_name,
        array(
            'name' => $request['name'],
            'email' => $request['email'],
        )
    );
    
    return new WP_REST_Response( array('message' => 'Booking added successfully' ), 200 );
}
