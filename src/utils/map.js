import constrain from './constrain'

export default (n, start1, stop1, start2, stop2, withinBounds) => {
	var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
	if (!withinBounds) {
		return newval;
	}
	if (start2 < stop2) {
		return constrain(newval, start2, stop2);
	} else {
		return constrain(newval, stop2, start2);
	}
};
