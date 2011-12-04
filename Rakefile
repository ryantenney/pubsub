require 'rubygems'
require 'closure-compiler'

HEADER = /((^\s*\/\/.*\n)+)/

desc "Use the Closure Compiler to compress pubsub.js"
task :build do
  source  = File.read('pubsub.js')
  header  = source.match(HEADER)
  min     = Closure::Compiler.new.compress(source)
  File.open('pubsub-min.js', 'w') do |file|
    file.write header[1].squeeze(' ') + min
  end
end
