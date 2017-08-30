game.skills.venge = {
  stun: {
    cast: function (skill, source, target) {
      source.addStun(target, skill);
      source.damage(skill.data('damage'), target, skill.data('damage type'));      
    }
  },
  corruption: {
    cast: function (skill, source, target) {
      var range = skill.data('aoe range');
      var width = skill.data('aoe width');
      var damage = skill.data('damage');
      source.opponentsInLine(target, range, width, function (card) {
        source.damage(damage, card, skill.data('damage type'));
        source.addBuff(card, skill);
      });
    }
  },
  aura: {
    passive: function (skill, source) {
      source.on('death.venge-aura', this.death);
      source.on('reborn.venge-aura', this.reborn);
      source.data('venge-aura', skill);
      var side = source.side();
      $('.table .card.'+side).each(function () {
        var ally = $(this);
        source.addBuff(ally, skill);
      });
    },
    death: function (event, eventdata) {
      var target = eventdata.target;
      var side = target.side();
      var skill = target.data('venge-aura');
      $('.table .card.'+side).each(function () {
        var ally = $(this);
        ally.removeBuff('venge-aura');
      });
      var buff = skill.data('buff');
      buff['damage bonus'] *= 2;
      skill.data('buff', buff);
      $('.table .card.'+side).each(function () {
        var ally = $(this);
        target.addBuff(ally, skill);
      });
    },
    reborn: function (event, eventdata) {
      var target = eventdata.target;
      var side = target.side();
      var skill = target.data('venge-aura');
      $('.table .card.'+side).each(function () {
        var ally = $(this);
        ally.removeBuff('venge-aura');
      });
      var buff = skill.data('buff');
      buff['damage bonus'] /= 2;
      skill.data('buff', buff);
      $('.table .card.'+side).each(function () {
        var ally = $(this);
        target.addBuff(ally, skill);
      });
    }
  },
  ult: {
    cast: function (skill, source, target) {
      if (target.side() == source.side()) target.purge();
      target.stopChanneling();
      var sourcePosition = source.getPosition();
      var targetPosition = target.getPosition();
      target.place(sourcePosition);
      source.place(targetPosition);
      game.timeout(200, source.select.bind(source));
    }
  }
};