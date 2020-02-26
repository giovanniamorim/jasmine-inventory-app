describe('Factorial', function(){
    xit('should get factorial of given number', function(){
        expect(factorial(3)).toEqual(6);
    });
    xit('should return new value for passing negative number or less/more than one argument', function(){
        expect(factorial(-3)).toEqual(null);
    });
});