<template>
	<div class="search-view">
		<home-header></home-header>
		<div class="use-space" style="height: 56px;"></div>
		<pull-up-load v-show="isAjax"></pull-up-load>
		<div class="search-wrapper" ref="searchul">
			<ul>
				<li>
					
				</li>
				<li>
					<!-- <div class="song-list" v-show="">
						<div class="song-header">
							<i class="play-all-icon"></i>
							<span @click="getSongDetail({axios:axios,list:songList.playlist.tracks,musicId:songList.playlist.tracks[0].id,num:0,playStatus:true,saveList: false})">播放全部({{songList.playlist.trackCount}})</span>
						</div>
						<div class="content-music" v-for="(songs,songsindex) in songList.playlist.tracks" :key="songsindex" @click="getSongDetail({axios:axios,list:songList.playlist.tracks,musicId:songs.id,num:songsindex,playStatus:true,saveList: false})">
							<span class="num">{{songsindex + 1}}</span>
							<div class="song-title">
								<span class="song">{{songs.name}}</span><br>
								<span class="alumb">{{songs.ar[0].name}}-{{songs.al.name}}</span>
							</div>
							<i class="more-icon"></i>
						</div>
					</div> -->
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>

	export default {
		name: 'SearchView'
		
	}
</script>

<style lang="less" scoped="scoped">
	.song-list {
		.song-header {
			display: flex;
			height: 40px;
			border-bottom: .5px solid #d9d9d9;
	
			.play-all-icon {
				flex: 0 0 46px;
				padding: 8px 11px;
				display: inline-block;
				width: 46px;
				height: 40px;
				background: url(../../../public/images/songlist_play.png) center center no-repeat;
				background-size: 20px;
			}
	
			&>span {
				flex: 1;
				display: inline-block;
				line-height: 40px;
				font-size: 14px;
			}
		}
	
		.content-music {
			margin: 5px 0;
			display: flex;
			height: 46px;
			width: 100%;
	
			.num {
				display: inline-block;
				flex: 0 0 46px;
				line-height: 46px;
				text-align: center;
				font-size: 14px;
				color: #808080;
			}
	
			.song-title {
				flex: 1;
				width: 0;
				border-bottom: .5px solid #d9d9d9;
	
				&>span {
					display: inline-block;
					line-height: 23px;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
	
				.song {
					font-size: 14px;
					vertical-align: bottom;
				}
	
				.alumb {
					font-size: 13px;
					vertical-align: top;
					color: #808080;
				}
			}
	
			.more-icon {
				display: inline-block;
				flex: 0 0 46px;
				height: 46px;
				border-bottom: .5px solid #d9d9d9;
				background: url(../../../public/images/more_bar.png) center center no-repeat;
				background-size: 20px;
			}
		}
	}
	
</style>
