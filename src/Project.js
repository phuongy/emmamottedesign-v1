import React, { Component } from 'react';
// import './Mixins.scss';
import './Project.scss';
import axios from 'axios';
import {Link} from 'react-router';

export default class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {projects: [], currentIndex: 0}
    }

    componentDidMount() {
        this.serverRequest = 
            axios.get('/projects.json')
                .then((result) => {   
                    this.setState({projects: result.data.projects}); 
                });
    }

    getCurrentIndex(slug) {
        let currentIndex = 0;

        this.state.projects.forEach((project, index) => {
            if (project.slug === slug) {
                currentIndex = index;
            }
        });

        return currentIndex;
    }

    getProject(currentIndex) {
        return this.state.projects[currentIndex];
    }

    getPreviousProject(currentIndex) {
        let prevIndex = currentIndex - 1;

        if (prevIndex < 0) {
            prevIndex = this.state.projects.length - 1;
        }

        return this.state.projects[prevIndex];
    }

    getNextProject(currentIndex) {
        let nextIndex = currentIndex + 1;

        if (nextIndex >= this.state.projects.length) {
            nextIndex = 0;
        }

        return this.state.projects[nextIndex];
    }

    render() {
        if (!this.props.params.slug) {
            return null;
        }

        const currentIndex = this.getCurrentIndex(this.props.params.slug);
        const project = this.getProject(currentIndex);
        const previousProject = this.getPreviousProject(currentIndex);
        const nextProject = this.getNextProject(currentIndex);
        
        if (!project) {
            return <div>Invalid project</div>
        }

        return (
            <div className="project">
                <section className="hero" style={{backgroundImage: `url(${project.hero})`}}>
                    <div className="inner">
                        <h1 className="hero_title">{project.title}</h1>
                        <div className="hero_subtitle">{project.subtitle}</div>
                    </div>
                </section>
                <section className="content">
                    <div className="inner">
                        {(project.summary) 
                            ? <div><h2>project summary</h2><div dangerouslySetInnerHTML={{ __html: project.summary }} /></div>
                            : null}
                        {(project.role) 
                            ? <div><h2>my role</h2><div dangerouslySetInnerHTML={{ __html: project.role }} /></div>
                            : null}
                    </div>
                </section>
                <section className="gallery">
                    <div className="inner">
                        {(project.gallery)
                         ? project.gallery.map((row, rowindex) => {
                            return (
                                <div className="gallery_row" key={`row-${rowindex}`}>
                                    {row.map((item, itemindex) => {
                                        return (
                                            <div key={`row-${rowindex}-item-${itemindex}`} className="gallery_item">
                                                <img src={item} alt="" />
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })
                        : null}
                    </div>
                </section>
                <section className="content-footer">
                    <div className="inner">
                        <div className="footer_nav">
                            <Link to={`/project/${previousProject.slug}`}>&lt; previous project <strong>{previousProject.title}</strong></Link>
                            <Link to={`/project/${nextProject.slug}`}>next project <strong>{nextProject.title}</strong> &gt;</Link>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
