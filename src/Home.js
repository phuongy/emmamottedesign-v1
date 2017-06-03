import './Home.scss'
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Home extends Component {
  
  constructor(props) {
    super(props)
    this.state = { projects: [] }
    this.container = null;
    this.hero = null;
    this.content = null;
    this.projects = null;
    this.updating = false;
    this.work = null;
  }

  componentDidMount() {

    this.serverRequest = axios.get('/projects.json')
      .then((result) => {
        this.setState({ projects: result.data.projects })
      })

    window.addEventListener('scroll', (e) => {

      if (!this.updating) {
        this.updating = true;
      
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        
        let heroHeight = this.hero.getBoundingClientRect().height;
        let content = this.content.getBoundingClientRect();
        let projectContainer = this.projects.getBoundingClientRect();
        let projects = this.projects.childNodes;
        
        // hero fade
        if (scrollTop > heroHeight) {
          this.hero.style.opacity = 0;
          // this.hero.style.opacity = (heroHeight - scrollTop) / heroHeight;
        } else {
          this.hero.style.opacity = 1;
        }

        // content fade
        if (scrollTop > content.top) {
          this.content.className = 'recent-work_header visible';
        } 

        // gallery fade
        if (scrollTop > projectContainer.top) {
          projects.forEach((project, index) => {

            if (project.className !== 'visible') {
              // let project_half = (project.getBoundingClientRect().bottom + project.getBoundingClientRect().top) / 2
              
              if (scrollTop > project.getBoundingClientRect().bottom) {
                project.className = 'visible';
              }
              // console.log('half:', project_half, 'scroll:', scrollTop, project.getBoundingClientRect(), project);
              // if (scrollTop > project.getBoundingClientRect().bottom) {
                // project.className = 'visible';
                // let project_half = (project.getBoundingClientRect().bottom + project.getBoundingClientRect().top) / 2
                // let project_opacity = (scrollTop - project_half) / (project.getBoundingClientRect().height);
                // project_opacity = (project_opacity > 1) ? 1 : project_opacity;
                // project.style.opacity = project_opacity;
                // project.querySelector('.project_thumb').style.transform = `translateY(${(1 - project_opacity) * 40}px)`;
              // }      
            }      
          });
        }

        // this.hero.style.opacity = opacity;
        this.updating = false;
      }
    })
  }

  render() {
    const projects = this.state.projects || null;

    if (!projects) {
      return null;
    }

    return (
      <div className="home" ref={(div) => {this.container = div}}>
        <section className="hero" ref={(div) => {this.hero = div}}>
          <div className="inner">
            <p className="line1">i'm emilie mamotte.</p>
            <p className="line2">senior digital designer</p>
            <p className="line3">strategist / pixel perfectionist.</p>
          </div>
        </section>
        <section id="work" className="recent-work" ref={(div) => {this.work = div}}>
          <div className="recent-work_header" ref={(div) => {this.content = div}}>
            <div className="inner">
              <p className="line1">get stuck into my</p>
              <p className="line2">recent work</p>
            </div>
          </div>
          <div className="project-thumbs" ref={(div) => {this.projects = div}}>
            {projects.map((project) => {
              return (
                <Link to={`/project/${project.slug}`} key={project.slug}>
                    <div className="project-preview">
                      <div className="project_thumb" style={{backgroundImage: `url(${project.thumb})`}}/>
                      <div className="project_title">{project.title}</div>
                      <div className="project_subtitle">{project.subtitle}</div>
                    </div>
                </Link>
              )
            })}
          </div>
        </section>
        <section className="content-footer">
          <div className="inner">
            for more...
          </div>
        </section>
        <div className="project-transition"></div>
      </div>
    )
  }
}
