class Magnifier {
		constructor(newSmallBox, newBigBox, newMask) {
			this.smallBox = newSmallBox;
			this.bigBox = newBigBox;
			this.mask = newMask;
		}

		onmouseover() {
			let that = this;
			this.smallBox.onmouseover = function() {
				that.bigBox.style.display = "block";
				that.mask.style.display = "block";
			}
		}

		onmouseout() {
			let that = this;
			this.smallBox.onmouseout = function() {
				that.bigBox.style.display = "none";
				that.mask.style.display = "none";
			}
		}

		onmousemove() {
			let that = this;
			this.smallBox.onmousemove = function(evt) {
				let e = evt || event;

				let left = e.pageX - this.offsetLeft - that.mask.offsetWidth / 2;
				let top = e.pageY - that.smallBox.offsetTop - that.mask.offsetHeight / 2;

				let x = that.bigBox.offsetWidth * left / that.mask.offsetWidth;
				let y = that.bigBox.offsetHeight * top / that.mask.offsetHeight;

				if (left < 0) {
					left = 0;
				}

				let maxLeft = this.offsetWidth - that.mask.offsetWidth;

				if (left > maxLeft) {
					left = maxLeft;
				}

				if (top < 0) {
					top = 0;
				}

				let maxTop = this.offsetHeight - that.mask.offsetHeight;

				if (top > maxTop) {
					top = maxTop;
				}

				that.mask.style.left = left + "px";
				that.mask.style.top = top + "px";

				that.bigBox.style.backgroundPositionX = -x + "px";
				that.bigBox.style.backgroundPositionY = -y + "px";
			}
		}

		getEvent() {
			this.onmouseover();
			this.onmouseout();
			this.onmousemove();
		}
}
