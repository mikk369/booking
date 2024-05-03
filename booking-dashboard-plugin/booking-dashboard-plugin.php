<?php
/*
Plugin Name: booking dashboard plugin
Version: 1.0
Author: Mike
*/

// Register the dashboard widget
function custom_dashboard_widget() {
    wp_add_dashboard_widget(
        'custom_dashboard_widget_id',
        'Custom Dashboard Widget',
        'render_custom_dashboard_widget'
    );
}
add_action('wp_dashboard_setup', 'custom_dashboard_widget');

// Callback function to render the content of the widget
function render_custom_dashboard_widget() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'bookings';
    $bookings = $wpdb->get_results("SELECT * FROM $table_name");

    // Render HTML content
    echo '<ul>';
    foreach ($bookings as $booking) {
        echo '<li>' . esc_html($booking->name) . ': ' . esc_html($booking->email) . '</li>';
    }
    echo '</ul>';
}
