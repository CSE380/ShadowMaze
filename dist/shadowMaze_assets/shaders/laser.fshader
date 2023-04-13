precision mediump float;

varying vec4 v_Position;

/**
 * Macros that define constants used in the fragment shader program. 
 */
#define MIN_DISTANCE 0.00
#define MAX_DISTANCE 0.02
#define MIDLINE 0.0
uniform vec4 laser_Color;
/**
 *  This function generates the appropriate alpha value for the fragment color
 *  to render a laser that looks like a sin wave. The alpha value depends on 
 *  the distance of the vertex position from the sine waves curve. Positions
 *  closer to the curve of the sin wave should have a higher alpha value.
 *
 *  +------------------------------------------------------+
 *  | 	   __	  __	 __		__	   __	  __		   | 
 *  | 	  /	 \	 /	\	/  \   /  \	  /	 \	 /	\		   |
 *  |   _/	  \_/	 \_/	\_/	   \_/	  \_/	 \_		   |  
 *  | 													   |
 *  +------------------------------------------------------+
 *
 *  @param position - the position from the vertex shader (v_Position)
 *  @return - the alpha value of the fragment color
 */
float sinwave_laser(vec4 position);

/**
 *  This function generates the appropriate alpha value for the fragment shader
 *  to render a laser that is a straight line. The alpha value depends on the
 *  distance of the vertex fragments position from the midline of the lasers
 *  bounding rectangle. 
 *
 *  +------------------------------------------------------+
 *  | 													   |
 *  + -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - + <- this is the midline
 *  |													   |
 *  +------------------------------------------------------+
 */
float linear_laser(vec4 position);
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
// TODO Need to somehow pass in the color from the laser shader type
void main(){
    gl_FragColor = vec4(laser_Color);
	//gl_FragColor.a = linear_laser(v_Position);
	gl_FragColor.a = sinwave_laser(v_Position);
	
}


// TODO Get the laser to look like a sinwave
float sinwave_laser(vec4 position) {
	// float dist = distance(position.y, MIDLINE);
	float high = 0.02*sin(100.0*position.x)+0.0;
	float dist = distance(position.y, high);
	float Amp = 0.02;
	if(abs(position.y - high)<Amp){
		return 1.0-smoothstep(MIN_DISTANCE, MAX_DISTANCE, dist);
	}
	return 0.0;
	
}

float linear_laser(vec4 position) {
	float dist = distance(position.y, MIDLINE);
	return  1.0-smoothstep(MIN_DISTANCE, MAX_DISTANCE, dist);
}


