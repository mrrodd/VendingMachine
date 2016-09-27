define(["require", "exports", "./coin", "./product", "./productFactory"], function (require, exports, Coins, product_1, productFactory_1) {
    "use strict";
    (function (VendingMachineSize) {
        VendingMachineSize[VendingMachineSize["small"] = 6] = "small";
        VendingMachineSize[VendingMachineSize["medium"] = 9] = "medium";
        VendingMachineSize[VendingMachineSize["large"] = 12] = "large";
    })(exports.VendingMachineSize || (exports.VendingMachineSize = {}));
    var VendingMachineSize = exports.VendingMachineSize;
    var Cell = (function () {
        function Cell(product) {
            this.product = product;
            this.stock = ko.observable(3);
            this.sold = ko.observable(false);
        }
        return Cell;
    }());
    var vendingMachine = (function () {
        function vendingMachine(useProductFactory) {
            var _this = this;
            if (useProductFactory === void 0) { useProductFactory = true; }
            this.useProductFactory = useProductFactory;
            this.paid = ko.observable(0);
            this.selectedCell = ko.observable(new Cell(new product_1.Initial()));
            this.cells = ko.observableArray([]);
            this.canPay = ko.pureComputed(function () { return _this.paid() - _this.selectedCell().product.price >= 0; });
            this.acceptedCoins = [new Coins.Dime(), new Coins.Quarter(), new Coins.Half(), new Coins.Dollar()];
            this.select = function (cell) {
                cell.sold(false);
                _this.selectedCell(cell);
            };
            this.acceptCoin = function (coin) {
                var currentPaid = _this.paid();
                _this.paid(currentPaid + coin.value);
            };
            this.pay = function () {
                if (_this.selectedCell().stock() < 1) {
                    alert("Sorry, out of stock!");
                    return;
                }
                var currentPaid = _this.paid();
                _this.paid(Math.round(((currentPaid - _this.selectedCell().product.price) * 100)) / 100);
                var currentStock = _this.selectedCell().stock();
                _this.selectedCell().stock(currentStock - 1);
                _this.selectedCell().sold(true);
            };
        }
        Object.defineProperty(vendingMachine.prototype, "size", {
            set: function (givenSize) {
                this.cells([]);
                for (var index = 0; index < givenSize; index++) {
                    this.cells.push(new Cell(productFactory_1.default()));
                }
                ;
            },
            enumerable: true,
            configurable: true
        });
        return vendingMachine;
    }());
    exports.vendingMachine = vendingMachine;
});
//# sourceMappingURL=vendingMachine.js.map