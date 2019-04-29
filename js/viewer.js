var tabPlayer = {
	UI : {
		show : function () {
			// insert HTML
			var overlay = $('<div id="tabplayer_container" style="width:90vw;height:90vh;margin:5vh 5vw;background:#fff;position:fixed;top:0;left:0;z-index:9999;border-radius:5px;-webkit-box-shadow: 0px 10px 40px 0px rgba(0,0,0,0.3);-moz-box-shadow: 0px 10px 40px 0px rgba(0,0,0,0.3);box-shadow: 0px 10px 40px 0px rgba(0,0,0,0.3);">\
												<div id="tabplayer" style="width:100%;height:100%;padding-top:30px;overflow-y:scroll;">\
												</div>\
												<div id="tabplayer_close" class="icon_close" style="color:#000;position:absolute;top:10px;right:30px;width:20px;height:20px;display:block;"><a href="#">[close]</a></div>\
											</div>');
			if ($("#tabplayer_container").length == 0) {
				overlay.appendTo('#content');
			}
			// close button
			$('#tabplayer_close').on('click', function(e) {
				tabPlayer.UI.close();
			});
		},
		close : function() {
			$('#tabplayer_container').remove();
		}
	},
	mime : null,
	file : null,
	location : null,
	player : null,
	mimeTypes : [
		'application/octet-stream',
		'application/gpx+xml'
	],
	view : function(file, data) {
		tabPlayer.file = file;
		tabPlayer.dir = data.dir;
		tabPlayer.ls = data.fileList.files;
		tabPlayer.location = data.fileList.getDownloadUrl(file, tabPlayer.dir);
		tabPlayer.mime = data.$file.attr('data-mime');
		tabPlayer.UI.show();
		$('#tabplayer').html('<div id="alphaTabScriptInit"></div>');
		$('#alphaTabScriptInit').alphaTab({
			file: tabPlayer.location,
			tracks: [0]
		});
	}
};

$(document).ready(function(){
	if (typeof FileActions !== 'undefined') {
		for (var i = 0; i < tabPlayer.mimeTypes.length; ++i) {
			var mime = tabPlayer.mimeTypes[i];
			OCA.Files.fileActions.register(mime, 'View', OC.PERMISSION_READ, '', tabPlayer.view);
			OCA.Files.fileActions.setDefault(mime, 'View');
		}
	}
});
