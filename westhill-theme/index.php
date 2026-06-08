<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

<main id="content" class="site-main" role="main">
	<?php
	if ( have_posts() ) :
		while ( have_posts() ) : the_post();
			the_content();
		endwhile;
	else :
		echo '<p>' . esc_html__( 'No content found.', 'westhill' ) . '</p>';
	endif;
	?>
</main>

<?php
get_footer();
