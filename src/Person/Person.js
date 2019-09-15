export class Person {
    constructor(name, age, saving){
        // public
        this._name = name
        this._age = age
        // private
        let _saving = saving != null ? saving : 0.0
        // methods on private, never directly return _saving
        this.givePaycheck = () => {
            _saving += 100.0
        }
        this.hasEnoughSavings = (itemCost) => {
            return _saving >= itemCost
        }
    }

    get name() {
        return this._name
    }

    set name(name) {
        let letters = /^[a-zA-Z\s]*$/
        if (name.value.match(letters)) {
            this._name = name   
        }
    }

    get age() {
        return this._age
    }

    set age(age) {
        let numbers = /^[0-9]+$/
        if (age.value.match(numbers)) {
            this._age = age
        }
    }
}