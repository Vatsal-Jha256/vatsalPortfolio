<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title"/> · RSS</title>
        <style>
          :root{--paper:#f3ede1;--ink:#1a1714;--muted:#7a6f63;--rule:#d8cfbe;--accent:#c47a1d}
          *{box-sizing:border-box}
          html,body{margin:0;padding:0;background:var(--paper);color:var(--ink);font-family:'Instrument Serif',Georgia,serif;font-size:18px;line-height:1.6;-webkit-font-smoothing:antialiased}
          .wrap{max-width:660px;margin:0 auto;padding:0 24px}
          nav{padding:28px 0 0;display:flex;justify-content:space-between;font-family:monospace;font-size:12px;letter-spacing:.06em;color:var(--muted)}
          nav a{color:inherit;text-decoration:none}
          nav a:hover{color:var(--accent)}
          h1{font-weight:400;font-size:clamp(48px,8vw,80px);line-height:1;margin:56px 0 16px;letter-spacing:-.01em}
          .hint{font-family:monospace;font-size:12px;color:var(--muted);letter-spacing:.04em;margin:0 0 48px;padding:14px 16px;border:1px solid var(--rule)}
          .hint code{color:var(--ink);word-break:break-all}
          .posts{list-style:none;padding:0;margin:0}
          .posts li{display:grid;grid-template-columns:110px 1fr;gap:24px;padding:18px 0;border-top:1px solid var(--rule);align-items:baseline}
          .posts li:last-child{border-bottom:1px solid var(--rule)}
          .posts time{font-family:monospace;font-size:12px;color:var(--muted);letter-spacing:.04em}
          .posts a{font-size:22px;color:var(--ink);text-decoration:none}
          .posts a:hover{color:var(--accent)}
          .empty{color:var(--muted);font-family:monospace;font-size:12px;letter-spacing:.04em;padding:32px 0;border-top:1px solid var(--rule)}
          footer{margin-top:80px;padding:28px 0 40px;border-top:1px solid var(--rule);font-family:monospace;font-size:11.5px;color:var(--muted);letter-spacing:.04em;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
          footer a{color:inherit;text-decoration:none}
          footer a:hover{color:var(--accent)}
          @media(max-width:540px){.posts li{grid-template-columns:1fr;gap:4px}}
        </style>
      </head>
      <body>
        <div class="wrap">
          <nav>
            <a href="./">← <xsl:value-of select="/rss/channel/title"/></a>
            <span>RSS feed</span>
          </nav>

          <h1>RSS.</h1>

          <p class="hint">
            This is a feed. Paste the URL into a reader like
            <a href="https://feedly.com">Feedly</a>,
            <a href="https://netnewswire.com">NetNewsWire</a>, or any RSS app:
            <br/>
            <code><xsl:value-of select="/rss/channel/atom:link/@href"/></code>
          </p>

          <ul class="posts">
            <xsl:for-each select="/rss/channel/item">
              <li>
                <time><xsl:value-of select="pubDate"/></time>
                <a>
                  <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </li>
            </xsl:for-each>
          </ul>

          <xsl:if test="not(/rss/channel/item)">
            <p class="empty">No posts yet.</p>
          </xsl:if>

          <footer>
            <span>&#169; 2026 Vatsal Jha</span>
            <a href="./">← home</a>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
