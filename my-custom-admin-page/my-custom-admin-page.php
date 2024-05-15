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
    // Make API call
    $response = wp_remote_get('https://webcodes.ee/test/wp-json/bookings/v1/bookings');

    // Check for errors
    if (is_wp_error($response)) {
        echo 'Error fetching data.';
        return;
    }

    // Get the response body
    $data = wp_remote_retrieve_body($response);

    // Decode JSON data
    $decoded_data = json_decode($data);

    // Display the fetched data
    ?>
    <div class="wrap">
    <h1>Custom Admin Page</h1>
    <p>This is a custom admin page created by a WordPress plugin.</p>
    <h2>Fetched Data</h2>
    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($decoded_data as $item) : ?>
                <tr>
                    <td><?php echo esc_html($item->startdate); ?></td>
                    <td><?php echo esc_html($item->enddate); ?></td>
                    <td><?php echo esc_html($item->email); ?></td>
                    <td>
                        <form method="post">
                            <input type="hidden" name="start_date" value="<?php echo esc_attr($item->startdate); ?>">
                            <input type="hidden" name="end_date" value="<?php echo esc_attr($item->enddate); ?>">
                            <input type="hidden" name="email" value="<?php echo esc_attr($item->email); ?>">
                            <button type="submit" name="delete_item">Delete</button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
    <?php
}
?>
