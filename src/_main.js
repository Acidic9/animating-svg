// @flow
class SVGMorphTo {
	// parentEl: HTMLElement
	svgEl: HTMLElement
	pathEl: HTMLElement
	lastMorphDuration: ?number

	constructor(svgEl: HTMLElement) {
		const pathEl = svgEl.querySelector('path')
		if (pathEl == null) {
			console.warn('svgEl has no path element')
			return
		}

		// const uid = '_' + Math.random().toString(36).substr(2, 9)
		// svgEl.outerHTML = `<div id="${uid}">${svgEl.outerHTML}</div>`

		// this.parentEl = document.getElementById(uid)
		// this.parentEl.innerHTML = ''
		// this.parentEl.appendChild(svgEl)
		
		this.svgEl = svgEl
		this.pathEl = pathEl
	}

	morphTo(path: string, dur: number, calcMode: string = 'linear', spline: ?string) {
		if (!this.lastMorphDuration) {
			this.morph(path, dur, calcMode, spline)
			return
		}

		this.lastMorphDuration = dur
		setTimeout(() => {
			this.morph(path, dur, calcMode, spline)
		}, dur)

		return this
	}

	morph(path: string, dur: number, calcMode: string = 'linear', spline: ?string) {
		console.log(path)
		this.lastMorphDuration = dur

		const lastPath = this.getLastPath() || ''

		this.clearOldAnimateElement()

		const pathEl = this.pathEl
		let animateEl = document.createElement('animate')

		animateEl.setAttribute('repeatCount', '1')
		animateEl.setAttribute('attributeName', 'd')
		animateEl.setAttribute('fill', 'freeze')
		animateEl.setAttribute('calcMode', calcMode)
		if (spline != null && calcMode === 'spline')
			animateEl.setAttribute('keySplines', spline)

		pathEl.setAttribute('d', lastPath)
		
		const newAnimateValues = lastPath + ';' + path
		// animateEl.setAttribute('values', newAnimateValues)
		animateEl.setAttribute('from', lastPath)
		animateEl.setAttribute('to', path)
		animateEl.setAttribute('dur', dur + 'ms')

		pathEl.appendChild(animateEl)
		
		this.reloadAnimation()
		// setTimeout(() => { pathEl.setAttribute('d', path) }, 3000)

		return this
	}
	
	clearOldAnimateElement() {
		const pathEl = this.pathEl
		const animateEl = pathEl.querySelector('animate')
		if (animateEl != null) {
			animateEl.parentNode.removeChild(animateEl)
		}
	}

	reloadAnimation() {
		// var cloneElement = this.svgEl.cloneNode(true);
		// this.svgEl.parentNode.replaceChild(cloneElement, this.svgEl);
		// this.svgEl.setCurrentTime(0) // @flow ignore
		// const parentNode = this.svgEl.parentNode
		// this.svgEl.parentNode.removeChild(this.svgEl)
		// parentNode.appendChild(this.svgEl)
		// this.svgEl.outerHTML = this.svgEl.outerHTML
		// this.parentEl.innerHTML = ''
		// this.parentEl.appendChild(svgEl)
		// this.parentEl.removeChild(this.svgEl)
		// this.parentEl.appendChild(this.svgEl)
		// console.log({ el: this.svgEl })
		// const outerHTML = this.svgEl.outerHTML

		const parentEl = this.svgEl.parentNode
		this.svgEl.outerHTML += this.svgEl.cloneNode().outerHTML
		this.parentEl.appendChild(this.svg)

		// console.log(this.svgEl.parentNode)
		// console.log(this.svgEl.parentNode)
		// parentNode.appendChild(this.svgEl)
		// this.svgEl.parentNode = parentNode
		// parentNode.removeChild(this.svgEl)
		// parentNode.appendChild(this.svgEl)
		// console.log(parentNode)
	}

	getLastPath(): ?string {
		const pathEl = this.pathEl
		const animateEl = pathEl.querySelector('animate')
		if (animateEl != null) {
			let lastPath = (animateEl.getAttribute('values') || '').split(';').slice(-1)[0]
			if (lastPath)
				return lastPath

			lastPath = animateEl.getAttribute('to')
			if (lastPath)
				return lastPath

			return pathEl.getAttribute('d')
		}

		return pathEl.getAttribute('d')
	}
}

const svgEl = document.getElementById('svg')
if (!svgEl)
	console.warn('SVG not found')
else {
	const svgMorphTo = new SVGMorphTo(svgEl)
	svgMorphTo
		.morph('M200,200 L400,200 L400,400 L200,400 L200,200', 200)

	setTimeout(() => {

		svgMorphTo.morph('M100,100 L450,200 L400,400 L200,400 L200,200', 200)
	}, 2000)
	// svgMorphTo.morph('M200,200 L400,200 L400,400 L200,400 L200,200', 200)
}
