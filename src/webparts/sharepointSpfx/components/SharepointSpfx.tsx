import * as React from 'react';
import styles from './SharepointSpfx.module.scss';
import type { ISharepointSpfxProps } from './ISharepointSpfxProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as _ from 'lodash';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import "bootstrap/dist/css/bootstrap.min.css"

export interface MinhaInterFace{
  Items: any;
}

export default class SharepointSpfx extends React.Component<ISharepointSpfxProps, MinhaInterFace, {}> {

  constructor(props){
    super(props);

    this.state = {
      Items: []
    }

  }

  async componentDidMount() {

    
    const sp = spfi().using(SPFx(this.props.context)); 
    
    
    const items: any[] = await sp.web.lists.getByTitle(this.props.list).items();

    this.setState({
      Items:items
    })

    console.log(items);
    console.log(this.props.lists);
    console.log('testando erros')
  }

  public render(): React.ReactElement<ISharepointSpfxProps> {
    
    const hours: number = new Date().getHours();
    let _message: string = "Good Morning";
    if(hours >= 12){
      if(hours <=16){
        _message = "Good Aftnoon";
      } else {
        _message = "Good Evening";
      }
    }
    const {
      description,
      isDarkTheme,
      title,
      assusnto,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    

    return (
      <section className={`${styles.sharepointSpfx} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <h1>Qualquer dúvida procurar: {escape(title)}</h1>
          <img alt="" src={isDarkTheme ? require('../assets/images.jpg') : require('../assets/images.jpg')} className={styles.welcomeImage} />
          <h2>{_message}, {escape(userDisplayName)} !</h2>
          <h2>{assusnto}</h2>
          

          <div>{environmentMessage}</div>
          <div>working to make you feel better <strong>{escape(description)}</strong></div>
          <div>Title:{escape(this.props.title)}</div>
        </div>
      </section>
    );
  }
}
