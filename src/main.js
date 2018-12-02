import anime from 'animejs'
import { Noise } from 'noisejs'
import map from './utils/map'

// window.noise = new Noise(Math.random())

// for (let i = 0; i < 100; ++i) {
// 	console.log(window.noise.perlin2(i / 100, 0))
// }


const ds = [
	// { value: 'M0,0 L600,0 L600,600 L0,600 L0,0 M100,300 C100,300,300,0,500,300 C500,300,300,600,100,300' }
]

const noise1 = new Noise(Math.random())
const noise2 = new Noise(Math.random())
for (let i = 0; i < 100; ++i) {
	const noiseY1 = map(noise1.perlin2(i / 10, i / 10), -1, 1, 0, 300)
	const noiseY2 = map(noise2.perlin2(i / 10, i / 10), -1, 1, 300, 600)
	ds.push({
		value: `M0,0 L600,0 L600,600 L0,600 L0,0 M100,300 C100,300,300,${noiseY1},500,300 C500,300,300,${noiseY2},100,300`
	})
}

console.log(ds)

var morphing = anime({
	targets: '#morphing path',
	d: ds,
	// points: [{
	// 		value: '70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369'
	// 	},
	// 	{
	// 		value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369'
	// 	},
	// 	{
	// 		value: '70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369'
	// 	},
	// 	{
	// 		value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369'
	// 	}
	// ],
	easing: 'linear',
	duration: ds.length * 800,
	direction: 'alternate',
	// delay: function(el, i, l) { return i * 100; },
	loop: true,
})

console.log(morphing)

