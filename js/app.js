var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];
// var my_news = 0;

var News = React.createClass({

    propTypes: {
        data: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        return {
            counter: 0
        };
    },

    onTotalNewsClick: function(e) {
        e.preventDefault();
        this.setState({counter: ++this.state.counter });
    },

    render: function(){
        var data = this.props.data;
        var newsTemplate;
        if (data.length > 0){
            newsTemplate = data.map((item, index)=>{
               return (
                   <div key={index}>
                       <Article data={item} />
                   </div>
               )
           })
       } else {
           newsTemplate = <p>Новостей нет</p>
       }

        return (
            <div ckassName="news">
                {newsTemplate}
                <strong className={'news__count ' + (data.length > 0 ? '' : 'none')}
                    onClick={this.onTotalNewsClick}>
                    Всего новостей: {data.length}
                </strong>
            </div>
        );
    }
});

var Article = React.createClass({

    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },

    getInitialState: function() {
        return {
            visible: false
        };
    },

    readmoreClikc: function(e) {
        e.preventDefault();
        this.setState({visible: true});
    },

    readlessClikc: function(e) {
        e.preventDefault();
        this.setState({visible: false});
    },

    render: function(){
        var author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;

        return (
            <div className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#"
                    onClick={this.readmoreClikc}
                    className={"news__readmore " + (visible ? 'none': '')}>
                    Подробнее
                </a>
                <p className={"news__big-text " + (visible ? '' : 'none')}>{bigText}</p>
                <a href="#"
                    onClick={this.readlessClikc}
                    className={"news__readless " + (visible ? '': 'none')}>
                    Скрыть
                </a>
            </div>
        )
    }
});

var App = React.createClass({
    render: function(){
        return (
            <div className="app">
                <Add />
                <h3>Новости</h3>
                <News data={my_news} /> {/*добавили свойство data */}
            </div>
        );
    }
});

var Add = React.createClass({

    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },

    onClickButton : function(e) {
        e.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = ReactDOM.findDOMNode(this.refs.text).value;
        alert(`${author}:\n${text}`)
    },

    getInitialState : function() {
        return {
            agreeNotChecked: true,
            textIsEmpty: true,
            authorIsEmpty: true
        }
    },

    onChangeAgree: function(e) {
        // e.preventDefault();
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    },

    onFieldChange: function(fieldName, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({[''+fieldName]:false})
        } else {
            this.setState({[''+fieldName]:true})
        }
    },

    render: function() {
        return (
            <form className='add cf'>
                <input
                    type='text'
                    className="add_author"
                    defaultValue=''
                    placeholder='Ваше имя'
                    onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                    ref='author'
                    />
                <textarea
                    className="add__text"
                    defaultValue=''
                    placeholder='Текст новости'
                    onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                    ref='text'
                    ></textarea>
                <label className='add__checkrule'>
                    <input
                        type='checkbox'
                        defaultChecked={false}
                        onChange={this.onChangeAgree}
                        ref='checkrule'  />
                    Я согласен с правилами
                </label>
                <button onClick={this.onClickButton}
                    ref='alert_button'
                    disabled={this.state.agreeNotChecked || this.state.textIsEmpty || this.state.authorIsEmpty}
                    >
                    Показать алерт
                </button>
            </form>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
