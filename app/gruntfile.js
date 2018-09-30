module.exports = function (grunt){
    require('load-grunt-tasks')(grunt); //->Agrega todos los complementos que encuentre de grunt
    /* grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch') */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass:{
            dist:{
                options:{sourcemap:'none'},
                files:[{
                    expand:true,
                    cwd:'source/sass',
                    src: ['**/*.scss'],
                    dest: 'public/stylesheets',
                    ext:'.css'
                }]
            }
        },

        watch:{
            app:{
                files:['public/stylesheets/*.css','views/**/*.pug'],
                options:{livereload: 4201}
            },
            styles:{
                files:['source/**/*.scss'],
                tasks:['sass'],
                options:{atBegin:true}
            }
        },
        concurrent:{
            options: {logConcurrentOutput:true},
            dev: ['watch:app','watch:styles']
        }
    });

    //grunt.registerTask('default',['sass']);
    //grunt.registerTask('build',['sass']);
    grunt.registerTask('watching',['watch:styles']);
    grunt.registerTask('default',['concurrent:dev']);
    
}

