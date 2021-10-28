(function() {
	var canvas = $('#canvas');
	if (!canvas[0].getContext) {
		$("#error").show();
		return false;
	}
	var width = canvas.width();
	var height = canvas.height();
	canvas.attr("width", width);
	canvas.attr("height", height);
	var opts = {
		seed: {
			x: width / 2 - 20,
			color: "rgb(190, 26, 37)",
			scale: 2
		},
		branch: [
            [535, 680, 570, 250, 500, 200, 30, 100, [
                [540, 500, 455, 417, 340, 400, 13, 100, [
                    [450, 435, 434, 430, 394, 395, 2, 40]
                ]],
                [550, 445, 600, 356, 680, 345, 12, 100, [
                    [578, 400, 648, 409, 661, 426, 3, 80]
                ]],
                [539, 281, 537, 248, 534, 217, 3, 40],
                [546, 397, 413, 247, 328, 244, 9, 80, [
                    [427, 286, 383, 253, 371, 205, 2, 40],
                    [498, 345, 435, 315, 395, 330, 4, 60]
                ]],
                [546, 357, 608, 252, 678, 221, 6, 100, [
                    [590, 293, 646, 277, 648, 271, 2, 80]
                ]]
            ]]
        ],
		bloom: {
			num: 700,
			width: 1080,
			height: 650,
		},
		footer: {
			width: 1200,
			height: 5,
			speed: 10,
		}
	}
	var textAnimate = eval(Jscex.compile("async", function() {
		// 开始时间点
		var together = new Date("2021-01-01 00:00:00");

		$("#code").show().typewriter();
		$("#clock-box").fadeIn(500);
		while (true) {
			timeElapse(together);
			$await(Jscex.Async.sleep(1000));
		}
	}));
	var tree = new Tree(canvas[0], width, height, opts);
	var seed = tree.seed;
	var foot = tree.footer;
	var hold = 1;
	canvas.click(function(e) {
		var offset = canvas.offset(),
			x, y;
		x = e.pageX - offset.left;
		y = e.pageY - offset.top;
		if (seed.hover(x, y)) {
			hold = 0;
			canvas.unbind("click");
			canvas.unbind("mousemove");
			canvas.removeClass('hand');
		}
	}).mousemove(function(e) {
		var offset = canvas.offset(),
			x, y;
		x = e.pageX - offset.left;
		y = e.pageY - offset.top;
		canvas.toggleClass('hand', seed.hover(x, y));
	});
	var seedAnimate = eval(Jscex.compile("async", function() {
		seed.draw();
		while (hold) {
			$await(Jscex.Async.sleep(10));
		}
		while (seed.canScale()) {
			seed.scale(0.95);
			$await(Jscex.Async.sleep(10));
		}
		while (seed.canMove()) {
			seed.move(0, 2);
			foot.draw();
			$await(Jscex.Async.sleep(10));
		}
	}));
	var growAnimate = eval(Jscex.compile("async", function() {
		do {
			tree.grow();
			$await(Jscex.Async.sleep(10));
		} while (tree.canGrow());
	}));
	var flowAnimate = eval(Jscex.compile("async", function() {
		do {
			tree.flower(2);
			$await(Jscex.Async.sleep(10));
		} while (tree.canFlower());
	}));
	var moveAnimate = eval(Jscex.compile("async", function() {
		tree.snapshot("p1", 240, 0, 610, 680);
		while (tree.move("p1", 500, 0)) {
			foot.draw();
			$await(Jscex.Async.sleep(10));
		}
		foot.draw();
		tree.snapshot("p2", 500, 0, 610, 680);
		canvas.parent().css("background", "url(" + tree.toDataURL('image/png') + ")");
		canvas.css("background", "#ffe");
		$await(Jscex.Async.sleep(300));
		canvas.css("background", "none");
	}));
	var jumpAnimate = eval(Jscex.compile("async", function() {
		var ctx = tree.ctx;
		while (true) {
			tree.ctx.clearRect(0, 0, width, height);
			tree.jump();
			foot.draw();
			$await(Jscex.Async.sleep(25));
		}
	}));
	var runAsync = eval(Jscex.compile("async", function() {
		$await(seedAnimate());
		$await(growAnimate());
		$await(flowAnimate());
		$await(moveAnimate());
		textAnimate().start();
		$await(jumpAnimate());
	}));
	runAsync().start();
})();


(() => {
	let h = 42;
	let d = (n) => Math.floor(Math.random() * n);
	let k = (c) => {
		let s = document.createElement('style');
		if (!!(window.attachEvent && !window.opera)) {
			s.styleSheet.cssText = c;
		} else {
			s.appendChild(document.createTextNode(c));
		}
		document.getElementsByTagName('head')[0].appendChild(s);
	};
	k(
	'@keyframes u{0%{transform:rotate(0deg);}25%{transform:rotate(10deg);}50%{transform:rotate(0deg);}75%{transform:rotate(-10deg);}100%{transform:rotate(0deg);}};');
	k('@keyframes m{0%{margin-top:2vh;opacity:0;}20%{opacity:1.0;margin-top:0vh;margin-left:0vw;transform:rotate(' +
		d(90) + 'deg);}100%{opacity:0.4;margin-top:100vh;margin-left:' + d(4) +
		'vw;transform:rotate(1080deg);}};');
	let w = document.createElement('div');
	w.id = 'daWorld';
	w.style = 'animation:u 60s ease-in infinite;position:fixed;top:0;right:0;bottom:0;left:0;pointer-events:none;';
	document.body.appendChild(w);
	while (h--) {
		let o = document.createElement('div');
		o.style =
			`pointer-events:none;opacity:0;animation:m ${d(14)+6}s ease-in ${d(4000)}ms infinite;z-index:1000;position:fixed;top:${d(40)}vh;left:${d(100)}vw;font-size:${d(40)+20}px;color:${['#d00','#e66','#fcc'][d(3)]};`;
		o.innerHTML = ['♡', '♥'][d(2)];
		w.appendChild(o);
	}
})()
