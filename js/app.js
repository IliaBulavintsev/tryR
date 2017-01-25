var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000'
    }
];
var News = React.createClass({
    render: function(){
        var data = this.props.data;
        var newsTemplate = data.map((item, index)=>{
            return (
                <div key={index}>
                    <p className="news__author">{item.author}:</p>
                    <p className="news__text">{item.text}</p>
                </div>
            )
        })

        return (
            <div ckassName="news">
                {newsTemplate}
                <strong>Всего новостей: {data.length}</strong>
            </div>
        );
    }
});

var App = React.createClass({
    render: function(){
        return (
            <div className="app">
                App component
                <News data={my_news} /> {/*добавили свойство data */}
                <Comments />
            </div>
        );
    }
});

var Comments = React.createClass({
    render: function(){
        return (
            <div className="comments">
                Comments here
            </div>
        );
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
