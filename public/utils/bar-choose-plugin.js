(function($) {
	$.fn.barChooseGraph = function(type, categories, min, max)
	{
		if(type == "init")
		{
			var nc = categories.length;
			var w = this.width();
			var cw = (100 / nc) + "%";
			var h = this.height();

			var bgm = document.createElement("DIV");
			$(bgm).addClass("bar-graph-main");
			this.append(bgm);

			var bgg = document.createElement("DIV");
			$(bgg).addClass("bar-graph-graph");
			$(bgm).append(bgg);

			var bgcs = document.createElement("DIV");
			$(bgcs).addClass("bar-graph-columns");
			$(bgg).append(bgcs);

			/*var bgls = document.createElement("DIV");
			$(bgls).addClass("bar-graph-labels");
			$(bgg).append(bgls);*/

			var bgca = [];
			var bgla = [];

			function checkHeights()
			{
				var maxh = 0;
				for(var i = 0; i < bgla.length; i++)
					maxh = Math.max(bgla[i].clientHeight, maxh);

				for(var i = 0; i < bgca.length; i++) {
					bgca[i].style.bottom = maxh + "px";
					bgca[i].style.maxHeight = (bgca[i].parentNode.clientHeight - maxh) + "px";
				}
			}

			for(var i = 0; i < nc; i++)
			{
				var bgcw = document.createElement("DIV");
				$(bgcw).addClass("bar-graph-column-wrap");
				bgcw.style.width = cw;
				$(bgcs).append(bgcw);

				var bgc = document.createElement("DIV");
				$(bgc).addClass("bar-graph-column");
				$(bgcw).append(bgc);
				bgca.push(bgc);

				/*var bgsl = document.createElement("DIV");
				$(bgsl).addClass("bar-graph-slider");
				$(bgc).append(bgsl);*/

				var bgl = document.createElement("DIV");
				$(bgl).addClass("bar-graph-label");
			 	$(bgl).append("<p>" + categories[i] + "</p>");
				$(bgl).append("<input type='text' class='bar-graph-input' value='" + min + "'></input>");
				$(bgcw).append(bgl);
				bgla.push(bgl);
			}

			window.setTimeout(function() {
				$(".bar-graph-column").each(function() {
					var bgc = this;
					$(bgc).on("mousedown", function(e) {
                                        	var sh = $(bgc).height();
						var mh = parseInt(bgc.style.maxHeight);
                                        	var sy = e.pageY;

                                        	$(document).on("mouseup", function(me) {
                                                	$(document).off("mouseup").off("mousemove");
                                        	});

                                        	$(document).on("mousemove", function(me) {
                                                	var my = (me.pageY - sy);
							var h = Math.min((sh - my),  mh);
                                                	$(bgc).css("height", Math.max(h, 0) + "px");

							$(bgc).parent().find("input").val(parseInt(max * h / mh).clamp(min, max));
                                        	});
					});
                                });

				$(".bar-graph-label input").each(function() {
					var self = this;
					$(this).change(function() {
						var v = parseInt($(self).val()).clamp(min, max);
						var mh = parseInt(self.style.maxHeight);
console.log(v);
						$(self).parent().prev().css("height", (mh * v / max) + "px");
						$(self).val(v);
					});
				});
			}, 100);

			checkHeights();

			$(window).resize(checkHeights);
		}
		else if(type == "get")
		{
			
		}

		return this;
	};
}(jQuery));
