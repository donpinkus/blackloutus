### Reference

| Variables              | 									 |
| ---------------------- | --------------------------------- |
| $ratio 				 | Proportion that defines the [scale](#).|
| $body-size 			 | Default size of body type.	     |
| $small-size 			 | Default size of small type.       |
| $baseline 			 | Increment that defines the [baseline grid](#). |
| $header-family 		 | Font stack to use for header elements. |
| $body-family 			 | Font stack to use for default type elements.  |
| $secondary-family 	 | Font stack that suplements the body family. Usually serif if body is sans. |
| $code-family 			 | Font stack to use for code elements. |
| $header-tracking 		 | Default [tracking](#) for the header family. |
| $body-tracking 		 | Default [tracking](#) for the body family. |
| $secondary-tracking 	 | Default [tracking](#) for the secondary family. |
| $code-tracking 		 | Default [tracking](#) for the code family.|

| Family Weights        |                                   |
| --------------------- | --------------------------------- |
| $var: 400, 700     	| Takes two font weights. Sets the weight of the corresponding classname to the first, and the weight of the `<b>` and `<strong>` tags to the second.      |
| $header-regular: 400,600 | Will create two extendable helper classes - `.header-face` and `.header-italic`.       |
| $header-light: 300,400 | Will create two extendable helper classes - `.header-light` and `.header-light-italic`.       |
| $header-bold: false    | Will not create helper classes for that weight in family.                                  |

| Mixins                 | 									 |
| ---------------------- | --------------------------------- |
| tracking(n)           | Sets [tracking](#) within the element in increments of 1/1000 em.			       	      |
| leading(n)            | Sets the [line-height](#) of an element as a multiple of the baseline increment.			    |
| word-spacing(n)       | Sets the [word spacing](#) within the element in increments of 1/1000 em.			       	     |
| font-size(n)          | Sets the font-size of an element at an $n (integer) number of steps up or down the [modular scale](#).   				       	                                  |
| modular-scale(n)      | Function that returns a rem value that corresponds to the $n (integer) number of steps up or down the [modular scale](#). 			       	           |

### Harmony & Scale
TypeCabinet uses [Modular Scale 1.0](https://github.com/Team-Sass/modular-scale/blob/1.x/readme.md) to define a double-stranded composition scale. The scale is calculated from the `$ratio` variable, and the two base type size variables, `$body-size` and `$small-size`. The primary use for this scale is in defining font sizes, stepping up and down the scale to create a page that reflects principles of [meaningful typography](http://alistapart.com/article/more-meaningful-typography). The `modular-scale()` function is also exposed, and returns rem values from the scale, and can be used to construct layouts and larger page structures.

### Type Families
There are four type families exposed for use in TypeCabinet, though many projects may use less. Header, Body, Secondary, and Code families are ready to use in a variety of weights. Variables in the `_config.scss` file define the stacks for the given families, and helper classes can either be extended from within sass stylesheets, or applied directly to html elements.

### Tracking, Leading, and Word Spacing
Default tracking options are available for each type family indendently within `_condfig.scss`. For example, if your body face consistently needs to be tracked out to maintain readabillity, you can

### Vertical Rhythym

### Composing the Page
