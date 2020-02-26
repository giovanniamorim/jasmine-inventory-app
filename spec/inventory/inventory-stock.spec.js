describe('Inventory Stock', function(){
    
    // Scenario: 1
    it ('Inventary stock should be update on sale/issue of a item', function(){
       var stockInHand_item1 = 11;
       var item1 = 1;
       var transaction = 'SALE';
       
       expect(stockInHand_item1 - item1).toEqual(10);
    });

    it('Inventory should be update on issue of an item within organization', function(){
        var stockInHand_item1 = 11;
        var item1 = 1;
        var transaction = 'ISSUE';
       
        expect(stockInHand_item1 - item1).toEqual(10);
    });
    
    //Scenario: 2
    it('Inventory Stock should be update on return of any item', function(){
        var stockInHand_item1 = 11;
        var item1 = 1;
        var transaction = 'SALE RETURN';

        expect(stockInHand_item1 + item1).toEqual(12);
    });

    //Scenario: 3
    it('Inventory Stock should be update on rceive or procuring new item', function(){
        var stockInHand_item1 = 11;
        var item1 = 1;
        var transaction = 'PROCUREMENT';
        
        expect(stockInHand_item1 + item1).toEqual(12);

    });
});
