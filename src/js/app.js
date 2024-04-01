import { isValidInn } from "./validators";
import { checkCard } from "./ckeckCard";

export class InnFormWidget {
    constructor(parentEl) {
        this.parentEl = parentEl;

        this.cash = null;

        // Значение начала карт
        this.startCartd = {
            visa: [4],
            master: [5],
            amex: [34, 37],
            discover: [65, 6011, 644, 645, 646, 647, 648, 649],
            jcb: [35],
            diners: [300, 3001, 302, 303, 304, 305, 36, 38, 39],
            mir: [2]
        }

        this.onChangeInput = this.onChangeInput.bind(this);
    }

    static get markup() {
        return `
        <div class="check-form">
            <ul class="cards">
                <li><span class="card visa" title="visa"></span></li>
                <li><span class="card master" title="master"></span></li>
                <li><span class="card amex" title="American Express"></span></li>
                <li><span class="card discover" title="Discover"></span></li>
                <li><span class="card jcb" title="JSB"></span></li>
                <li><span class="card diners" title="Diners Club"></span></li>
                <li><span class="card mir" title="mir"></span></li>
            </ul>
        <form class="innogrn-form-widget">
            
            <div class="control">
                <input type="text" id="innogrn-input" class="input">
            </div>
            <button class="submit">Click to Validate</button>
        </form>
        </div>
        `;
    }

    // static get submitSelector() {
    //     return '.submit';
    // }

    static get inputSelector() {
        return '.input';
    }

    static get selector() {
        return '.innogrn-form-widget';
    }

    bindToDOM() {
        this.parentEl.innerHTML = InnFormWidget.markup;

        this.element = this.parentEl.querySelector(InnFormWidget.selector);
        // this.submit = this.element.querySelector(InnFormWidget.submitSelector);
        this.input = this.element.querySelector(InnFormWidget.inputSelector);

        this.element.addEventListener('input', this.onChangeInput);
        this.element.addEventListener('submit', (event) => {
            event.preventDefault();
            this.cash = null;
            console.log(this.cash)
            // Проверка методом луна
            let check = isValidInn(this.input.value);
            if (check === true) {
                this.input.classList.add('valid');
                console.log('Your number is valid');
            
            // обнуление
            if (this.input.value == null) {
                this.input.classList.remove('valid');
            }
            } else {
                this.input.value = null;
                this.updateCardImage(this.cash);
                console.log('Your number is not valid');
            }    
        });
    }

    onChangeInput(event) {

        // Если ввод пуст, то кэш обнуляем
        if (event.target.value === "") {
            this.cash = null;
            console.log('empty')
        }

        // Если кэш нулевой, то производим поиск по введенному значению
        if (this.cash == null) {
            this.cash = checkCard(this.startCartd, event.target.value);
            this.updateCardImage(this.cash);
            console.log(this.cash);
        }  

    }

    updateCardImage(cardType) {
        const cards = {
            visa: document.querySelector('.card.visa'),
            master: document.querySelector('.card.master'),
            amex: document.querySelector('.card.amex'),
            discover: document.querySelector('.card.discover'),
            jcb: document.querySelector('.card.jcb'),
            diners: document.querySelector('.card.diners'),
            // mir: document.querySelector('.card.mir'),
        };

        // Проверка карты, если пусто, то отображаем картинки
        if (this.cash == null) {
            for (const card in cards) {
                cards[card].classList.remove('disabled');
            }
        } else {
            
            // Скрываем карты
            for (const card in cards) {
            cards[card].classList.add('disabled');
            }

            // Показать картинку соответствующую типу карты
            if (cardType && cards[cardType]) {
                cards[cardType].classList.remove('disabled');
            }
        }       
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const parentEl = document.body;
  const innFormWidget = new InnFormWidget(parentEl);
  innFormWidget.bindToDOM();
});
