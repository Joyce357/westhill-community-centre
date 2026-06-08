<?php
/**
 * West Hill Community Theme Functions
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Enqueue Theme Scripts and Styles
 */
function westhill_enqueue_scripts() {
    // Google Fonts: Poppins & Inter
    wp_enqueue_style( 'westhill-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap', array(), null );

    // Main Theme Stylesheet
    wp_enqueue_style( 'westhill-style', get_stylesheet_uri(), array(), wp_get_theme()->get('Version') );
}
add_action( 'wp_enqueue_scripts', 'westhill_enqueue_scripts' );

/**
 * Theme Support Setup
 */
function westhill_theme_setup() {
    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    // Let WordPress manage the document title.
    add_theme_support( 'title-tag' );

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support( 'post-thumbnails' );

    // Register Navigation Menus
    register_nav_menus( array(
        'primary' => esc_html__( 'Primary Menu', 'westhill' ),
        'footer'  => esc_html__( 'Footer Menu', 'westhill' ),
    ) );

    // Switch default core markup for search form, comment form, and comments to output valid HTML5.
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );

    // Add support for core custom logo.
    add_theme_support( 'custom-logo', array(
        'height'      => 250,
        'width'       => 250,
        'flex-width'  => true,
        'flex-height' => true,
    ) );

    // Elementor Specific Theme Supports
    add_theme_support( 'elementor-global-colors' );
    add_theme_support( 'elementor-global-typography' );
}
add_action( 'after_setup_theme', 'westhill_theme_setup' );

/**
 * Image Optimization & Upload Settings
 * Enforce WebP Support and allow SVG uploads for icons
 */
function westhill_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    $mimes['webp'] = 'image/webp';
    return $mimes;
}
add_filter('upload_mimes', 'westhill_mime_types');

/**
 * Force lazy loading on images to ensure performance
 */
add_filter( 'wp_lazy_loading_enabled', '__return_true' );
