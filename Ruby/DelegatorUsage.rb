# In Ruby, SimpleDelegator is used to delegate unknown methods to an object
# method_missing is called when a method is... missing.
require 'delegate'

class MyDelegatedClass < SimpleDelegator

  def initialize(object)
    super(object)
  end

end

# This class delegates a set of methods to another class, and whines for others
class MyOtherClass
  METHODS_TO_DELEGATE = [ :example_method1, :example_method2]

  def initialize(delegate)
    @delegate = delegate
  end

  def method_missing(method_name, *args)
    if METHODS_TO_DELEGATE.include?(method_name)
      @delegate.send(method_name, *args)
    else
      logger.warn "Y U SO STUPID G? No #{method_name} for #{args} here..."
      super
    end 
  end

end

# This class responds to the delegator
class MyDelegateClass

  def example_method1
    puts "hi"
  end

  def example_method2
    puts "Also works!"
  end

end

# this class is even more cool, it only delegates methods which start with "example"

class MyIntelligentDelegator

  def initialize(delegate)
    @delegate = delegate
  end

  def method_missing(method_name, *args)
    match = method_name.to_s.match(/^example_(\w+)/)
    if match
      puts "Matched" + match[1] 
      @delegate.send(method_name, *args)
    else
      super
    end
  end

end
