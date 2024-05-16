<?php
/*
Plugin Name: my custom admin page    
Version: 1.0
Author: Mike
*/

// Add menu page
function custom_admin_page_menu() {
    add_menu_page(
        'Broneeringute leht', // Page title
        'Broneeringute leht', // Menu title
        'manage_options', // Capability required
        'Broneeringute leht', // Menu slug
        'render_custom_admin_page' // Callback function to render page content
    );
}
add_action('admin_menu', 'custom_admin_page_menu');

// Render custom admin page
function render_custom_admin_page() {
    echo '<div id="custom-admin-page-root">asd</div>';
}

add_action('admin_enqueue_scripts', 'enqueue_custom_admin_page_scripts');

function enqueue_custom_admin_page_scripts($hook_suffix) {
    if ($hook_suffix !== 'toplevel_page_broneeringute-leht') {
        return;
    }

    wp_enqueue_script(
        'custom-admin-page-react-app',
        plugin_dir_url(__FILE__) . 'my-admin-page/build/static/js/main.js',
        array('wp-element'),
        filemtime(plugin_dir_path(__FILE__) . 'my-admin-page/build/static/js/main.js'),
        true
    );

    wp_enqueue_style(
        'custom-admin-page-react-app',
        plugin_dir_url(__FILE__) . 'my-admin-page/build/static/css/main.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'my-admin-page/build/static/css/main.css')
    );
}