import React, { Component } from 'react'
import './App.scss'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import Prismic from 'prismic.io'

import { Link } from 'react-router'

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      menuIsActive: false,
      menuIsClosing: false,
      footerIsVisible: false,
      containerClass: 'container'
    }

    this.container = null;
    // this.containerClass = 'container';
    this.footer = null;
    this.main = null;
  }

  componentDidMount() {

    // Prismic.Api("https://emmamottedesigns.prismic.io/api", (err, Api) => {
    //   console.log(err, Api); 
    //   Api.getByID('WRkUNyYAACgAGiMQ*WRkUNyYAACgAGiMR').then((pageContent) => {
    //     console.log(pageContent);
    //   })
    // });

    window.addEventListener('scroll', (e) => {

      if (!this.updating) {
        this.updating = true;

        let scrollTop = document.querySelector('body').scrollTop;
        let mainHeight = document.querySelector('.main').getBoundingClientRect().height;
        let mainHalfHeight = mainHeight / 2;

        let main = this.main.getBoundingClientRect();
        let contact = document.querySelector('.contact').getBoundingClientRect();

        if (contact.top < 0) {
          this.setState({footerIsVisible: true});
        } else {
          this.setState({footerIsVisible: false});
        }
        
        if (scrollTop > mainHalfHeight) {
          this.footer.style.display = 'block';
        } else {
          this.footer.style.display = 'none';
        }

        if (main.top < 0) {
          this.setState({containerClass:  'container dark-nav-bar' });
        } else {
          this.setState({containerClass: 'container'});
        }
          
        this.updating = false;
      }
    });

  }

  toggleMenu() {
    if (this.state.menuIsActive) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    setTimeout(() => {
      this.setState({ menuIsActive: true })
    }, 100);
  }

  closeMenu() {
    setTimeout(() => {
      this.setState({ menuIsClosing: true })
    }, 100);

    setTimeout(() => {
      this.setState({ menuIsActive: false })
      this.setState({ menuIsClosing: false })
    }, 400);
  }

  render() {

    let containerClass = this.state.containerClass;
    containerClass += (this.state.menuIsActive) ? ' menu-is-active ' : '';
    containerClass += (this.state.menuIsClosing) ? ' menu-is-closing ' : '';

    return (
      <div ref={(div) => { this.container = div }} className={containerClass}>
        <section className="header">
          <div className="header_logo">
            <Link to={`/home`}>
              <span className="logo">
                Emilie Mamotte
                <span className="logo-asset" />
              </span>
            </Link>
          </div>
          <div className="header_menu">
            <span tabIndex="0"
              className={`menu-button ${(this.state.menuIsActive) ? 'menu--close' : 'menu--open'}`}
              onClick={() => this.toggleMenu()}>
              {(this.state.menuIsActive) ? 'Close Menu' : 'Open menu'}
              <span className="button-asset" />
            </span>
          </div>
        </section>
        <nav className="main_nav">
          <ul>
            <li><Link to={`home`} onClick={() => this.closeMenu()}>Home</Link></li>
            <li><Link to={`home#work`} onClick={() => this.closeMenu()}>Work</Link></li>
            <li><Link to={`home#contact`} onClick={() => this.closeMenu()}>Contact</Link></li>
          </ul>
        </nav>
        <div ref={(div) => { this.main = div }}></div>
        <ReactCSSTransitionGroup          
          component="div"
          className="main"          
          transitionName="route-change"
          transitionEnterTimeout={10}
          transitionLeaveTimeout={10}>
          {React.cloneElement(this.props.children, {
            key: location.pathname
          })}
        </ReactCSSTransitionGroup>
        <section className={`footer ${(this.state.footerIsVisible) ? 'is-visible' : ''}`} ref={(div) => { this.footer = div }}>
          <div className="inner">
            <p>
              hit me up for a chat<br />
              <a href="mailto:emamotte@gmail.com">emamotte@gmail.com</a>
            </p>
            <p>
              do a background check<br />
              <a href="https://www.linkedin.com/in/emilie-mamotte-55459129/">my linkedin</a>
            </p>
          </div>
        </section>
        <section className="contact"></section>
      </div>
    )
  }
}
