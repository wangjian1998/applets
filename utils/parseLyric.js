const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/


export function parseLyric(lyricStr) {
  const lyricStrings = lyricStr.split('\n')
  const lyricInfo = []
  for (const lineString of lyricStrings) {
    const timeResult = timeRegExp.exec(lineString)
    console.log(timeResult)
    if (!timeResult) continue
    // 获取时间
    const minute =Number(timeResult[1]) * 60 * 1000
    const second = Number(timeResult[2]) * 1000
    const millsecond = timeResult[3].length === 2 ? Number(timeResult[3]) * 10 : Number(timeResult[3])
    const time = minute + second +millsecond
    // 获取歌词文本
    const lyricText = lineString.replace(timeRegExp, "")

    const lyricObj = {time, lyricText}
    lyricInfo.push(lyricObj)
  }
  return lyricInfo
}