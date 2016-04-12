module.exports = function (grunt) {

	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-open");
	grunt.loadNpmTasks("grunt-ts");

	grunt.initConfig({

		connect:
		{
			server:
			{
				options:
				{
					port: 8080,
					base: "./bin",
					livereload: true,
					debug: true,
					hostname: "0.0.0.0",
					open: "http://127.0.0.1:8080"
				}
			}
		},

		watch:
		{
			debug:
			{
				files: ["src/**/*.ts", "assets/**/*.*"],
				tasks: ["ts:debug", "copy:assets"],
				options:
				{
					livereload: true,
					livereloadOnError: false
				}
			},
			release:
			{
				files: ["src/**/*.ts", "assets/**/*.*"],
				tasks: ["ts:release", "copy:assets"],
				options:
				{
					livereload: true,
					livereloadOnError: false
				}
			},
			ts:
			{
				files: ["src/**/*.ts"],
				tasks: ["ts:debug"],
				options:
				{
					livereload: true
				}
			}
		},

		ts:
		{
			debug:
			{
				src: ["src/**/*.ts"],
				out: "bin/app.js"
			},
			release:
			{
				src: ["src/**/*.ts"],
				out: "bin/app.js"
			}
		},

		copy:
		{
			assets:
			{
				files: [
					{
						cwd: "assets/",
						expand: true,
						src: "**",
						dest: "bin/assets/"
					},
					{
						cwd: "level_design/configs/",
						expand: true,
						src: "**",
						dest: "bin/assets/configs/"
					}
				]
			},
			libs:
			{
				cwd: "libs/",
				expand: true,
				src: "**",
				dest: "bin/libs/"
			},
			html_debug:
			{
				cwd: "html/",
				expand: true,
				src: "index_debug.html",
				dest: "bin/",
				rename: function (dest) {
					return dest + "index.html";
				}
			},
			html_release:
			{
				cwd: "html/",
				expand: true,
				src: "index_release.html",
				dest: "bin/",
				rename: function (dest) {
					return dest + "index.html";
				}
			}
		},

		clean:
		{
			local: ["bin/"]
		}
	});

	grunt.registerTask("default", ["clean:local", "copy:assets", "copy:libs", "copy:html_debug", "ts:debug", "connect", "watch:debug"]);
	grunt.registerTask("release", ["clean:local", "copy:assets", "copy:libs", "copy:html_release", "ts:release", "connect", "watch:release"]);
}