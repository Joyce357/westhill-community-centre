<?php
/**
 * Plugin Name: West Hill Core functionality
 * Description: Registers Custom Post Types for West Hill Community Centre (Programs, Events, Stories, Partners).
 * Version: 1.0.0
 * Author: Antigravity
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function westhill_register_cpts() {
    
    // 1. Programs & Services
    register_post_type( 'program', array(
        'labels' => array(
            'name'          => 'Programs & Services',
            'singular_name' => 'Program',
            'add_new_item'  => 'Add New Program',
            'edit_item'     => 'Edit Program',
            'all_items'     => 'All Programs',
        ),
        'public'        => true,
        'has_archive'   => true,
        'menu_icon'     => 'dashicons-groups',
        'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'show_in_rest'  => true, // Enables Gutenberg/Elementor support
    ) );

    // 2. Events
    register_post_type( 'event', array(
        'labels' => array(
            'name'          => 'Events',
            'singular_name' => 'Event',
            'add_new_item'  => 'Add New Event',
            'edit_item'     => 'Edit Event',
            'all_items'     => 'All Events',
        ),
        'public'        => true,
        'has_archive'   => true,
        'menu_icon'     => 'dashicons-calendar-alt',
        'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'show_in_rest'  => true,
    ) );

    // 3. Stories of Hope (Testimonials)
    register_post_type( 'story', array(
        'labels' => array(
            'name'          => 'Stories of Hope',
            'singular_name' => 'Story',
            'add_new_item'  => 'Add New Story',
            'edit_item'     => 'Edit Story',
            'all_items'     => 'All Stories',
        ),
        'public'        => true,
        'has_archive'   => false,
        'menu_icon'     => 'dashicons-heart',
        'supports'      => array( 'title', 'editor', 'thumbnail' ),
        'show_in_rest'  => true,
    ) );

    // 4. Community Partners
    register_post_type( 'partner', array(
        'labels' => array(
            'name'          => 'Community Partners',
            'singular_name' => 'Partner',
            'add_new_item'  => 'Add New Partner',
            'edit_item'     => 'Edit Partner',
            'all_items'     => 'All Partners',
        ),
        'public'        => true,
        'has_archive'   => false,
        'menu_icon'     => 'dashicons-building',
        'supports'      => array( 'title', 'thumbnail' ),
        'show_in_rest'  => true,
    ) );
    
    // 5. Resources Hub
    register_post_type( 'resource', array(
        'labels' => array(
            'name'          => 'Resources',
            'singular_name' => 'Resource',
            'add_new_item'  => 'Add New Resource',
            'edit_item'     => 'Edit Resource',
            'all_items'     => 'All Resources',
        ),
        'public'        => true,
        'has_archive'   => true,
        'menu_icon'     => 'dashicons-media-document',
        'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'show_in_rest'  => true,
    ) );
}
add_action( 'init', 'westhill_register_cpts' );

// Add Categories/Taxonomies to Programs to match the requested 4 Categories
function westhill_register_taxonomies() {
    register_taxonomy( 'program_category', 'program', array(
        'labels' => array(
            'name'              => 'Program Categories',
            'singular_name'     => 'Program Category',
        ),
        'hierarchical'      => true,
        'public'            => true,
        'show_in_rest'      => true,
    ) );
}
add_action( 'init', 'westhill_register_taxonomies' );
