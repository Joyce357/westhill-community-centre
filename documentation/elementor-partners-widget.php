<?php
/**
 * Elementor Custom Partners Showcase Widget for West Hill Community Centre.
 * 
 * This file contains a fully functional Elementor widget that registers
 * a Repeater control for admin uploadable partner logos, names, and links.
 * It maps directly to the styling and responsive behaviors configured in style.css.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Westhill_Partners_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'westhill_partners';
	}

	public function get_title() {
		return esc_html__( 'West Hill Partners Showcase', 'westhill-core' );
	}

	public function get_icon() {
		return 'eicon-gallery-grid';
	}

	public function get_categories() {
		return [ 'general' ];
	}

	public function get_keywords() {
		return [ 'partners', 'sponsors', 'logos', 'showcase' ];
	}

	protected function register_controls() {

		$this->start_controls_section(
			'content_section',
			[
				'label' => esc_html__( 'Partners Content', 'westhill-core' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'partner_name',
			[
				'label' => esc_html__( 'Partner Name', 'westhill-core' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => esc_html__( 'Partner Name' , 'westhill-core' ),
				'label_block' => true,
			]
		);

		$repeater->add_control(
			'partner_logo',
			[
				'label' => esc_html__( 'Partner Logo', 'westhill-core' ),
				'type' => \Elementor\Controls_Manager::MEDIA,
				'default' => [
					'url' => \Elementor\Utils::get_placeholder_image_src(),
				],
			]
		);



		$this->add_control(
			'partners_list',
			[
				'label' => esc_html__( 'Partners List', 'westhill-core' ),
				'type' => \Elementor\Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => [
					[
						'partner_name' => esc_html__( 'West Hill Community Association', 'westhill-core' ),
					],
					[
						'partner_name' => esc_html__( 'Love Scarborough', 'westhill-core' ),
					],
					[
						'partner_name' => esc_html__( 'Toronto Public Health', 'westhill-core' ),
					],
					[
						'partner_name' => esc_html__( 'Toronto District School Board', 'westhill-core' ),
					],
					[
						'partner_name' => esc_html__( 'West Hill Collegiate Institute', 'westhill-core' ),
					],
					[
						'partner_name' => esc_html__( 'Jays Care Foundation', 'westhill-core' ),
					],
					[
						'partner_name' => esc_html__( 'Code Ninjas', 'westhill-core' ),
					],
					[
						'partner_name' => esc_html__( 'Local Community Organizations', 'westhill-core' ),
					],
				],
				'title_field' => '{{{ partner_name }}}',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style',
			[
				'label' => esc_html__( 'Showcase Style', 'westhill-core' ),
				'tab' => \Elementor\Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_responsive_control(
			'logo_height',
			[
				'label' => esc_html__( 'Logo Max Height', 'westhill-core' ),
				'type' => \Elementor\Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em', '%' ],
				'range' => [
					'px' => [
						'min' => 20,
						'max' => 200,
					],
				],
				'default' => [
					'unit' => 'px',
					'size' => 56,
				],
				'selectors' => [
					'{{WRAPPER}} .partner-logo-wrapper img, {{WRAPPER}} .partner-logo-wrapper svg' => 'height: {{SIZE}}{{UNIT}}; max-height: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();

		if ( empty( $settings['partners_list'] ) ) {
			return;
		}
		?>
		<div class="partners-showcase">
			<?php foreach ( $settings['partners_list'] as $item ) : ?>
				<div class="partner-logo-item">
					<div class="partner-logo-wrapper">
						<?php if ( ! empty( $item['partner_logo']['id'] ) ) : ?>
							<?php echo wp_get_attachment_image( $item['partner_logo']['id'], 'medium', false, [
								'class' => 'partner-logo-img',
								'style' => 'object-fit: contain;',
							] ); ?>
						<?php elseif ( ! empty( $item['partner_logo']['url'] ) ) : ?>
							<img src="<?php echo esc_url( $item['partner_logo']['url'] ); ?>" class="partner-logo-img" alt="<?php echo esc_attr( $item['partner_name'] ); ?>" style="object-fit: contain;" />
						<?php endif; ?>
					</div>

					<?php if ( ! empty( $item['partner_name'] ) ) : ?>
						<span class="partner-logo-name"><?php echo esc_html( $item['partner_name'] ); ?></span>
					<?php endif; ?>
				</div>
			<?php endforeach; ?>
		</div>
		<?php
	}
}
